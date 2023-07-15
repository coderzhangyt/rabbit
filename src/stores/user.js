import { defineStore } from 'pinia'
import { loginAPI } from '@/apis/login'
import { ref } from 'vue'
import { useCartStore } from './cart'
import { MergeCartAPI } from '@/apis/cart'


export const useUserStore = defineStore('user', () => {
    const CartStore = useCartStore()
    //定义state
    const userInfo = ref({})
    //定义action
    const getUserInfo = async ({ account, password }) => {
        const res = await loginAPI({ account, password })
        userInfo.value = res.result
        // console.log(res, 'userInfo');
        await MergeCartAPI(CartStore.cartList.map(item => {
            return {
                skuId: item.skuId,
                selected: item.selected,
                count: item.count
            }
        }))
        //登录后渲染该用户的购物车信息（接口）
        CartStore.updateNewList()
    }
    // 定义退出功能
    const clearUserInfo = () => {
        //清除用户信息
        userInfo.value = {}
        //清除本地购物车
        CartStore.clearCart()
    }

    return {
        userInfo, getUserInfo, clearUserInfo
    }
},
    {
        //
        persist: true
    }
)