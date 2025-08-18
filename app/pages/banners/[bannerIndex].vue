<script setup lang="ts">
import { useRoute } from 'vue-router'
import Countdown from '~/components/countdown.vue';

definePageMeta({name:"chardetails"})

const bannerStore = useBannerStore()
const bannerlength = bannerStore.bannersCount

const route = useRoute()

const routes = Array.from({ length: bannerlength - 1 }, (_, i) => ({
  path: `/${i + 1}`,
  component: Countdown
}))
</script>

<template>
<countdown :banner-index="+(route.params.bannerIndex!)">
  <template #finished>
      <div class="custom-finished">
        <h3>finished</h3>
      </div>
    </template>
  </countdown>
</template>
