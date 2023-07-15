import httpInstance from '@/utils/http'

//生成-订单
export const getcheckInfoAPI = () => {
    return httpInstance({
        url: '/member/order/pre'
    })
}

//提交-订单
export const createOrderInfoAPI = (data) => {
    return httpInstance({
        url: '/member/order',
        method: 'POST',
        data
    })
}