import { onMounted, ref } from 'vue'
import { getBannerAPI } from '@/apis/home'

//获取轮播图
export function useBanner() {
    const bannerList = ref([])
    const getBanner = async () => {
        const res = await getBannerAPI()
        // console.log(res);
        bannerList.value = res.result
    }

    onMounted(() => {
        // CategoryAPI(),
        getBanner()
    })
    return {
        bannerList
    }
}