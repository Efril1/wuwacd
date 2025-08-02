<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'


const props = defineProps({
  targetTime: {
    type: Date,
    required: true
  },
  bannerchar: {
    type: String,
    required: true
  },
  infoImage: {
    type: String,
    default: ''
  }
})
const items = ref<TabsItem[]>([
  {
    label: 'countdown',
    value: 'countdown'
  },
  {
    label: 'info',
    value: 'info'
  }
])


const now = ref(new Date())
const timer = ref<NodeJS.Timeout | null>(null)
const activeTab = ref('countdown')

const timeLeft = computed(() => {
  const diff = props.targetTime.getTime() - now.value.getTime()
  
  if (diff <= 0) return null
  
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
})

const updateTime = () => {
  now.value = new Date()
}

onMounted(() => {
  updateTime()
  timer.value = setInterval(updateTime, 1000)
})

onBeforeUnmount(() => {
  if (timer.value) clearInterval(timer.value)
})
</script>

<template>
  <div>
    <UTabs v-model="activeTab" :items="items" class="w-full" />

    <div v-if="activeTab === 'countdown'">
      <div class="countdown">
        <h2>Countdown to {{ bannerchar }}</h2>
        
        <div v-if="timeLeft" class="time-display">
          <div class="time-block">
            <span class="number">{{ timeLeft.days }}</span>
            <span class="label">Days</span>
          </div>
          <div class="time-block">
            <span class="number">{{ timeLeft.hours.toString() }}</span>
            <span class="label">Hours</span>
          </div>
          <div class="time-block">
            <span class="number">{{ timeLeft.minutes.toString() }}</span>
            <span class="label">Minutes</span>
          </div>
          <div class="time-block">
            <span class="number">{{ timeLeft.seconds.toString() }}</span>
            <span class="label">Seconds</span>
          </div>
        </div>
        <slot v-else name="finished"></slot>
      </div>
    </div>

    <div v-else-if="activeTab === 'info'">
      <UCard>
        <img v-if="infoImage" :src="infoImage" alt="Information" />
        <p v-else>No image provided</p>
      </UCard>
    </div>
  </div>
</template>