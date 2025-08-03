<script setup lang="ts">
const targetDate = new Date(Date.UTC(2025, 7, 28, 3, 0, 0));
const characterInfo = {
  name: "Augusta",
  element: "Electro",
  weapon: "Broadblade",
  about: "\"All the sun touches is ours to fight for.\"—Augusta"
}
</script>

<template>
  <countdown 
    :target-time="targetDate"
    :character-info="characterInfo"
    bannerchar="AUGUSTA"
    info-image-desktop="/images/augustacard.webp"
    info-image-mobile="/images/augustamobile.webp"
    background-video="/images/augustavid.webm" 
    color-choice="error"
  >
    <template #finished>
      <div class="custom-finished">
        <h3>finished</h3>
      </div>
    </template>
  </countdown>
</template>

