import { defineStore } from "pinia";
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { insertCartAPI, findCartListAPI, delCartAPI } from '@/apis/cart'

export const useCartStore = defineStore('cart', () => {
    //定义state  购物车列表
    const cartList = ref([])
    const UserStore = useUserStore()
    const isLogin = computed(() => UserStore.userInfo.token)
    //定义action

    //获取购物车列表 action
    const updateNewList = async () => {
        const res = await findCartListAPI()
        cartList.value = res.result
    }

    //清除购物车
    const clearCart = () => {
        cartList.value = []
    }

    //加入购物车
    const addCart = async (goods) => {
        const { skuId, count } = goods
        //已添加过的商品 - count+
        //未添加过的商品 - push
        // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
        if (isLogin.value) {
            //加入购物车
            await insertCartAPI({ skuId, count })
            updateNewList()

        } else {
            const item = cartList.value.find((item) => goods.skuId === item.skuId)
            if (item) {
                item.count++
            } else {
                cartList.value.push(goods)
            }
        }
    }
    //删除某项商品
    const delCart = async (skuId) => {
        if (isLogin.value) {
            await delCartAPI([skuId])
            updateNewList()
        } else {
            cartList.value = cartList.value.filter(item => item.skuId !== skuId)
        }
    }

    //计算总的商品数
    const totalCount = computed(() => {
        return cartList.value.reduce((prev, cur) => {
            return prev + Number(cur.count)
        }, 0)
    })
    //计算总价
    const totalPrice = computed(() => {
        return cartList.value.reduce((prev, cur) => {
            return prev + Number(cur.price) * Number(cur.count)
        }, 0).toFixed(2)
    })
    //改变单选框状态
    const singleChecked = (id, selected) => {
        const item = cartList.value.find((item) => item.skuId === id)
        item.selected = selected
    }

    //是否全选
    const isAll = computed(() => {
        //返回布尔值
        return cartList.value.every(item => item.selected)
    })

    //全选
    const allChecked = (selected) => {
        cartList.value.forEach(item => item.selected = selected)
    }

    //已选择数量
    const selectedCount = computed(() => {
        return cartList.value.filter(item => item.selected === true).reduce((prev, cur) => {
            return prev + Number(cur.count)
        }, 0)
    })

    //已选择总价
    const selectedPrice = computed(() => {
        return cartList.value.filter(item => item.selected === true).reduce((prev, cur) => {
            return prev + Number(cur.count) * Number(cur.price)
        }, 0).toFixed(2)
    })


    return {
        cartList,
        addCart,
        delCart,
        totalPrice,
        totalCount,
        singleChecked,
        isAll,
        allChecked,
        selectedCount,
        selectedPrice,
        clearCart,
        updateNewList
    }
},
    {
        persist: true,
    }
)