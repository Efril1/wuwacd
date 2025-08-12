<script setup lang="ts">
import NumberFlow from "@number-flow/vue";

const props = defineProps({
  timeLeft: {
    type: Object as PropType<{
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
    } | null>,
    required: true,
  },
  colorChoice: {
    type: String,
    default: "primary",
  },
});
</script>

<template>
  <div class="text-center scale-150">
    <div v-if="timeLeft" class="timer-display">
      <div class="flex flex-wrap gap-x-4 gap-y-2">
        <div class="flex flex-col">
          <NumberFlow
            :value="timeLeft.days"
            class="text-4xl sm:text-5xl font-extrabold"
            :format="{ notation: 'standard', minimumIntegerDigits: 2 }"
          />
          <span class="text-sm font-light">DAYS</span>
        </div>

        <span class="text-4xl font-extrabold md:pt-4">:</span>

        <div class="flex flex-col">
          <NumberFlow
            :value="timeLeft.hours"
            class="text-4xl sm:text-5xl font-extrabold"
            :format="{ notation: 'standard', minimumIntegerDigits: 2 }"
          />
          <span class="text-sm">HOURS</span>
        </div>

        <span class="text-4xl font-extrabold md:pt-4">:</span>

        <div class="flex flex-col">
          <NumberFlow
            :value="timeLeft.minutes"
            class="text-4xl sm:text-5xl font-extrabold"
            :format="{ notation: 'standard', minimumIntegerDigits: 2 }"
          />
          <span class="text-sm">MINUTES</span>
        </div>

        <span class="text-4xl font-extrabold md:pt-4">:</span>

        <div class="flex flex-col">
          <NumberFlow
            :value="timeLeft.seconds"
            class="text-4xl sm:text-5xl font-extrabold"
            :format="{ notation: 'standard', minimumIntegerDigits: 2 }"
          />
          <span class="text-sm">SECONDS</span>
        </div>
      </div>
    </div>
    <slot v-else name="finished"></slot>
  </div>
</template>

<style scoped>
.timer-display {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
    "Liberation Mono", "Courier New", monospace;
  margin-top: -100px;
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