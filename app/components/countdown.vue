<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'
type ColorChoice = 'primary' | 'info' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';


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
  },
  backgroundVideo: {
    type: String,
    default: ''
  },
  colorChoice: {
    type: String as PropType<ColorChoice>,
    default: 'primary'
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

      <div v-if="backgroundVideo" class="fixed inset-0 z-0">
      <video 
        autoplay 
        muted 
        loop 
        playsinline 
        class="w-full h-full object-cover"
      >
        <source :src="backgroundVideo" type="video/mp4">
      </video>
<div class="absolute inset-0 bg-black/70"></div>   
 </div>

    
  <div class="flex flex-col min-h-screen relative z-10">
    <!-- Tabs at top -->
    <div class="w-full max-w-2xl mx-auto pt-4">
      <UTabs :color="colorChoice || 'primary'" v-model="activeTab" :items="items" />
    </div>

    <!-- Countdown Content -->
        <h2 class="text-xl font-medium mb-8 text-center w-full pt-8">Countdown to {{ bannerchar }}</h2>
    <div v-if="activeTab === 'countdown'" class="flex-1 grid place-items-center p-4">
      <div class="text-center">
        
        
        <div v-if="timeLeft" class="timer-display my-8">
          <div class="flex items-baseline justify-center gap-2">
            <span class="number">{{ String(timeLeft.days).padStart(2, '0') }}</span>
            <span class="colon">:</span>
            <span class="number">{{ String(timeLeft.hours).padStart(2, '0') }}</span>
            <span class="colon">:</span>
            <span class="number">{{ String(timeLeft.minutes).padStart(2, '0') }}</span>
            <span class="colon">:</span>
            <span class="number">{{ String(timeLeft.seconds).padStart(2, '0') }}</span>
          </div>
        </div>
        <slot v-else name="finished"></slot>
      </div>
    </div>
    <div v-else-if="activeTab === 'info'" class="w-full max-w-2xl mx-auto">
      <UCard class="overflow-hidden bg-white/8">
        <div class="flex flex-col md:flex-row">
          <!-- Left -->
          <div class="w-full md:w-1/2 flex items-center justify-center">
            <img 
              v-if="infoImage" 
              :src="infoImage" 
              alt="Information" 
              class="object-cover w-full h-64 md:h-full"
            >
            <p v-else class="text-center p-4">No image provided</p>
          </div>
          
          <!-- Right -->
          <div class="w-full md:w-1/2 p-6 flex flex-col justify-center">
            <div class="space-y-4 text-center md:text-left">
              <h3 class="text-2xl font-bold">Character Info</h3>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-sm text-gray-500">Name</p>
                  <p class="font-medium">Iuno</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Element</p>
                  <p class="font-medium">Aero</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">Weapon</p>
                  <p class="font-medium">Gauntlet</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UCard>
    </div>
  </div>

</template>

<style scoped>
.timer-display {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

.number {
  font-size: 5rem;
  font-weight: 800;
  line-height: 1;
}

.colon {
  font-size: 4rem;
  font-weight: 600;
  padding-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .number {
    font-size: 3rem;
  }
  .colon {
    font-size: 2.5rem;
  }
}
</style>
