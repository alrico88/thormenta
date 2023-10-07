<template lang="pug">
.container
  .row.py-3.py-md-5
    .col
      .hstack.gap-4.align-items-end
        nuxt-link.text-white(to="/")
          icon(name="bi:arrow-left", size="40")
        .vstack.gap-2
          h1.mb-0 Saved #[span.text-title storms]
  .row.mb-2
    .col
      ul.list-inline
        li.list-inline-item Sort by:
        li.list-inline-item
          button.btn.btn-link(@click="sortBy = 'recent'", :class="{active: sortBy === 'recent'}") Most recent
        li.list-inline-item
          button.btn.btn-link(@click="sortBy = 'measurements'", :class="{active: sortBy === 'measurements'}") Most measurements
  .row.row-cols-1.row-cols-md-3.g-3
    .col(v-for="storm of localSortedStorms" :key="storm.id")
      saved-storm-card(
        :id="storm.id" 
        :name="storm.name"
        :storm-data="storm.stormData"
        @delete-storm="(id) => store.deleteSavedStorm(id)"
      )

</template>

<script setup lang="ts">
import { orderBy } from "lodash-es";
import { useStormStore } from "~/stores/storm";

useHead({
  title: "Saved storms",
  meta: [
    {
      name: "description",
      content: "Check past storms you have saved",
    },
  ],
});

const store = useStormStore();
const { sortedSavedStorms } = storeToRefs(store);

const sortBy = ref<"recent" | "measurements">("recent");

const localSortedStorms = computed(() => {
  if (sortBy.value === "recent") {
    return sortedSavedStorms.value;
  } else {
    return orderBy(sortedSavedStorms.value, (d) => d.stormData.length, "desc");
  }
});
</script>

<style lang="scss" scoped>
.btn-link {
  padding: 0;
  text-underline-offset: 5px;

  &.active {
    text-decoration: underline;
  }
}
</style>
