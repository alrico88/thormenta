<template lang="pug">
div {{ seconds }} seconds ago
</template>

<script setup lang="ts">
import { processNumber } from "number-helper-functions";

const props = defineProps<{
  start: Date;
}>();

const seconds = ref("0.00");

useRafFn(() => {
  const millis = new Date().getTime() - props.start.getTime();
  const secs = millis / 1000;

  seconds.value = secs.toFixed(2);
});
</script>
