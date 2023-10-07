<template lang="pug">
.card
  .card-body
    .hstack.gap-2.justify-content-between
      .vstack.gap-2
        div {{ name }}
        .text-muted {{ dayjs(last(stormData)?.end).format('ddd DD MMM YYYY HH:mm') }}
        .text-small {{ stormData.length }} measurements
      div
        button.btn.btn-outline-danger.z-3.position-relative(@click="() => emit('deleteStorm', id)")
          icon(name="bi:trash")
    nuxt-link.stretched-link.z-1(:to="`/storm/${id}`")
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { last } from "lodash-es";

const props = defineProps<{
  id: string;
  name: string;
  stormData: {
    id: string;
    start: Date;
    end?: Date;
  }[];
}>();

const emit = defineEmits<{
  deleteStorm: [string];
}>();
</script>
