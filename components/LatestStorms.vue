<template lang="pug">
.row
  .col
    .hstack.gap-2.justify-content-between.flex-wrap
      div
        h2.mb-0 Latest #[span.text-title storms]
      div
        nuxt-link.text-white(to="/storms") View all storms #[icon(name="material-symbols:arrow-forward-rounded")]
.row.row-cols-1.row-cols-md-3.g-2
  .col(v-for="storm of latestSavedStorms", :key="storm.id")
    saved-storm-card(
      :id="storm.id"
      :name="storm.name"
      :storm-data="storm.stormData"
      @delete-storm="handleDelete"
    )
  .col(v-if="latestSavedStorms.length === 0") No saved storms yet
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { last } from "lodash-es";
import { useStormStore } from "~/stores/storm";

const store = useStormStore();
const { latestSavedStorms } = storeToRefs(store);

function handleDelete(id: string) {
  store.deleteSavedStorm(id);
}
</script>
