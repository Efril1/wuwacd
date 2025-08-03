<script setup lang="ts">
const targetDate = new Date(Date.UTC(2025, 8, 17, 3, 0, 0))
const characterInfo = {
  name: "Iuno",
  element: "Aero",
  weapon: "Gauntlet",
  about: "\"While the moon cycles, I remain the anchor.\"—Iuno"
}
</script>

<template>
  <countdown 
    :target-time="targetDate"
    :character-info="characterInfo"
    bannerchar="IUNO"
    info-image="/images/Iuno_Card.webp"
    background-video="/images/iunovid.mp4" 
    color-choice="secondary"
     >
    <template #finished>
      <div class="custom-finished">
        <h3>finished</h3>
      </div>
    </template>
  </countdown>
</template>

<style>
:root.dark {
  color-scheme: dark;
}
</style>