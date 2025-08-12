<script setup lang="ts">
import { useBannerStore } from '~/stores/bannerStore'

const bannerStore = useBannerStore()

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