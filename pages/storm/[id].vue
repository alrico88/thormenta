<template lang="pug">
.container
  .row.py-3.py-md-5
    .col
      .vstack.gap-2
        .hstack.gap-4.align-items-end
          nuxt-link.text-white(to="/storms")
            icon(name="bi:arrow-left", size="40")
          h1.mb-0 #[span.text-title Storm] details: {{ foundStorm.name }}
        
  .vstack.gap-3
    .row
      .col
        h2 Saved #[span.text-title duration]
        .list-group
          list-group-item
            template(#left) Started:
            template(#right)
              strong {{ dates.from }}                
          list-group-item
            template(#left) Ended:
            template(#right)
              strong {{ dates.to }}     
    .row
      .col
        h2 Saved #[span.text-title measurements]
        .list-group
          the-counter(
            v-for="item of foundStorm.stormData"
            :key="item.id"
            :start="item.start"
            :end="item.end"
            :coords="foundStorm.coords"
          )
    .row(v-if="foundStorm.coords")
      .col
        h2 Storm #[span.text-title coordinates]
        .list-group
          list-group-item
            template(#left) Latitude:
            template(#right) {{ foundStorm.coords[1] }}
          list-group-item
            template(#left) Longitude:
            template(#right) {{ foundStorm.coords[0] }}
</template>

<script setup lang="ts">
import { useStormStore } from "~/stores/storm";
import dayjs from "dayjs";

useHead({
  title: "Saved storm",
});

definePageMeta({
  middleware: ["saved"],
});

const route = useRoute();

const store = useStormStore();
const { savedStorms } = storeToRefs(store);

const foundStorm = computed(() => {
  const found = savedStorms.value.find((d) => d.id === route.params.id);

  if (found) {
    return {
      ...found,
      stormData: found.stormData.map((d) => {
        return {
          ...d,
          start: new Date(d.start),
          end: new Date(d.end as Date),
        };
      }),
    };
  } else {
    return {
      id: "",
      name: "",
      stormData: [],
    };
  }
});

const domain = useDomain(
  () => foundStorm.value.stormData,
  (d) => d.start.getTime(),
);

const dates = computed(() => {
  const fmt = "dddd DD MMMM YYYY HH:mm:ss";

  return {
    from: dayjs(domain.value.min).format(fmt),
    to: dayjs(domain.value.max).format(fmt),
  };
});
</script>
