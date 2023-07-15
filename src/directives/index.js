import { useIntersectionObserver } from '@vueuse/core'

export const directivePlugin = {
    install(app) {
        app.directive('img-lazy', {
            mounted(el, binding) {
                //el:指令绑定的那个元素 img
                //binding： binding.value 指令等于号后面绑定的表达式的值  图片url
                // console.log(el, binding.value);
                //useIntersectionObserver 方法是vueUse中的方法，检测是否进入视口
                const { stop } = useIntersectionObserver(
                    el,
                    //isIntersecting 是布尔值 ，如果图片展示在视口了，就显示true，否则false
                    ([{ isIntersecting }]) => {
                        // console.log(isIntersecting);
                        if (isIntersecting) {
                            el.src = binding.value
                            stop() //解决重复监听问题
                        }
                    }
                )
            }
        })
    }
}