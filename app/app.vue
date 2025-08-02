<script setup lang="ts">

const targetDate = new Date(Date.UTC(2025, 8, 17, 3, 0, 0))
</script>

<template>
  <countdown 
    :target-time="targetDate"
    bannerchar="IUNO"
    info-image="/images/Iuno_Card.webp"
    background-video="/images/iunovid.mp4" 
    color-choice="secondary" >
    <template #finished>
      <div class="custom-finished">
        <h3>gg</h3>
      </div>
    </template>
  </countdown>
</template>
