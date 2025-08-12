<script setup lang="ts">
import { useBannerStore } from '~/stores/bannerStore'

// Remove the individual props and use the store index instead
const bannerStore = useBannerStore()

// Specify which banner index to use (0 for Iuno in your example)
const bannerIndex = 1
</script>

<template>
  <countdown
    :banner-index="bannerIndex"
  >
    <template #finished>
      <div class="custom-finished">
        <h3>finished</h3>
      </div>
    </template>
  </countdown>
</template>