import { ref, computed, onUnmounted } from 'vue'
import dayjs from 'dayjs'

export const useCountDown = () => {
    let timer = null
    //时间
    const time = ref(0)

    //格式化时间
    const formatTime = computed(() => {
        return dayjs.unix(time.value).format('mm分ss秒')
    })

    //倒计时
    const start = (curTime) => {
        time.value = curTime
        timer = setInterval(() => {
            time.value--
        }, 1000)
    }

    //销毁前，清除定时器。防止内存溢出
    onUnmounted(() => {
        timer && clearInterval(timer)
    })

    return {
        formatTime,
        start
    }
}