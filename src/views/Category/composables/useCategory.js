import { onMounted, watch, ref } from 'vue'
import { getCategory } from '@/apis/category'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'


//获取二级分类
export function useCategory() {
    const categoryData = ref({})
    const route = useRoute()
    const CategoryAPI = async (id = route.params.id) => {
        const res = await getCategory(id)
        // console.log(res);
        categoryData.value = res.result
    }

    onMounted(() => {
        CategoryAPI()
    })
    //使用这种方式，页面会不停的发送请求
    // onUpdated(() => {
    //     CategoryAPI()
    // })

    watch(() => route.params.id, (id) => {
        CategoryAPI(id)
    }, { immediate: true })


    //目标：路由参数变化时，可以把分类数据接口重新发送
    onBeforeRouteUpdate((to) => {
        //console.log(to);//打印最新的路由数据
        getCategory(to.params.id)
    })

    return {
        categoryData
    }
}