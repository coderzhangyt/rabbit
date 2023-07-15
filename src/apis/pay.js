import httpInstance from "@/utils/http";

export const payCartAPI = (id) => {
    return httpInstance({
        url: `/member/order/${id}`
    })
}