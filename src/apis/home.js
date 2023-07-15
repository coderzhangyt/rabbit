import httpInstance from '@/utils/http'

export function getBannerAPI(params = {}) {
    const { distributionSite = '1' } = params
    return httpInstance({
        url: '/home/banner',
        params: {
            distributionSite
        }
    })
}

export function getNewGoodsAPI() {
    return httpInstance({
        url: '/home/new'
    })
}

export function getHotGoodsAPI() {
    return httpInstance({
        url: '/home/hot'
    })
}

export function getGoodsAPI() {
    return httpInstance({
        url: '/home/goods'
    })
}