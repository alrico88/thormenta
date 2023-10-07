<template lang="pug">
.list-group-item(:class="{'border-warning': !end}")
  .vstack.gap-2
    .hstack.gap-2.justify-content-between.align-items-center
      .hstack.gap-2.align-items-center
        div #[span.fw-bold Lightning] on {{ startFormatted }} 
        button.btn.btn-link.p-0(
          v-if="hasMapButton"
          @click="() => toggleMap()"
        ) #[icon(name="bi:map")]
      template(v-if="!end")
        time-since.fw-bold.lead.text-nowrap(:start="start")
      template(v-else)
        distance-away.text-nowrap(:distance="distance" :coords="coords")
    distance-map(
      v-if="showMap", 
      :distance="distance", 
      :coords="coords"
      :is-current="isCurrent"
    )
</template>

<script setup lang="ts">
import dayjs from "dayjs";

const props = withDefaults(
  defineProps<{
    start: Date;
    end: Date | undefined;
    coords?: [number, number];
    isCurrent?: boolean;
  }>(),
  {
    isCurrent: false,
  },
);

const [showMap, toggleMap] = useToggle(false);

const hasMapButton = computed(() => {
  if (!props.end) {
    return false;
  } else if (props.isCurrent) {
    return props.end != null;
  } else {
    return props.coords != null;
  }
});

const { start, end } = toRefs(props);

const startFormatted = computed(() =>
  dayjs(props.start).format("ddd DD MMM YYYY HH:mm:ss"),
);

const distance = useDistance(start, end);
</script>
