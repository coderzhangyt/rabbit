import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/apis/layoutAPI'

export const useCategoryStore = defineStore('category', () => {
    const categoryList = ref([])
    const getCategory = async () => {
        const res = await getCategoryAPI()
        // console.log(res, 'res');
        categoryList.value = res.result
    }
    // getCategoryAPI().then(res => {
    //     // console.log(res);
    //     categoryList.value = res.result
    // })
    return { categoryList, getCategory }
})