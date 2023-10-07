<template lang="pug">
.row
  .col
    .vstack.gap-3
      .row
        .col
          .hstack.gap-2.align-items-center.justify-content-between.flex-wrap
            h2.mb-0 Current #[span.text-title storm]
            button.btn.btn-link.p-0.text-white(
              @click="resetCurrentStorm"
              :disabled="sortedCurrentStorm.length === 0"
            ) Start over?
      .row
        .col
          button.btn.btn-lg.w-100(
            :class="btnVariant"
            @click="measure"
          )
            icon(:name="iconToShow", size="30")
            |  {{ hasPending ? 'Heard thunder' : 'Saw lightning' }}
      .row
        .col
          .list-group
            the-counter(
              v-for="item of sortedCurrentStorm"
              :key="item.id"
              :start="item.start"
              :end="item.end"
              is-current
            )
</template>

<script setup>
import { useStormStore } from "~/stores/storm";

const store = useStormStore();
const { currentStorm, sortedCurrentStorm, hasPending } = storeToRefs(store);

const iconToShow = computed(() =>
  hasPending.value ? "mingcute:thunderstorm-fill" : "carbon:thunderstorm",
);

const btnVariant = computed(() => {
  return hasPending.value ? "btn-warning" : "btn-primary";
});

const id = ref(null);

function measure() {
  if (id.value) {
    store.heardThunder(id.value);

    id.value = null;
  } else {
    id.value = store.sawLightning();
  }
}

function resetCurrentStorm() {
  const confirmation = confirm(
    "Are you sure you want to discard current storm?",
  );

  if (confirmation) {
    id.value = null;

    currentStorm.value = [];
  }
}
</script>
