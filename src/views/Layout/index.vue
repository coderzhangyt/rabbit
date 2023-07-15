<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutSticky from './components/LayoutSticky.vue'
import {useCategoryStore} from '@/stores/category.js'
import { onMounted } from 'vue'

const useCategory = useCategoryStore()
onMounted(()=>useCategory.getCategory())

</script>
 
<template>
  <LayoutSticky></LayoutSticky>
  <LayoutNav />
  <LayoutHeader />
  <RouterView />
  <LayoutFooter />
</template>