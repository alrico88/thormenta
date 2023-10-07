<template lang="pug">
.lead #[span.fw-bold {{ distance.distance }} {{ distance.units }}] away
</template>

<script setup lang="ts">
import type { Distance } from "~/composables/useDistance";

const props = defineProps<{
  distance: Distance;
}>();
</script>
