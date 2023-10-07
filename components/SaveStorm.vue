<template lang="pug">
.row
  .col
    h2 Save #[span.text-title storm]
    form(@submit.prevent="handleSubmit")
      .row.align-items-md-end.g-3
        .col-md-5
          .form-group
            label.form-label(for="saveStorm") Enter a name:
            .input-group
              input.form-control#saveStorm(
                type="text"
                v-model="stormName"
                :disabled="emptyCurrentStorm"
              )
        .col-md-5
          .form-group
            label.form-label(for="stormCoords")
              .hstack.gap-2
                div Coordinates [lon, lat]
                button.btn.btn-link.p-0(
                  type="button", 
                  @click="setCurrentLocation"
                  :disabled="emptyCurrentStorm || gettingLocation"
                ) {{ gettingLocation ? 'Getting location...' : 'Use current location' }}
            input.form-control#stormCoords(
              type="text"
              v-model="stormCoords"
              :disabled="emptyCurrentStorm"
            )
        .col-md-2
          button.btn.btn-primary.w-100(type="submit", :disabled="saveDisabled") Save
</template>

<script setup lang="ts">
import { useStormStore } from "~/stores/storm";

const store = useStormStore();
const { currentStorm } = storeToRefs(store);

const stormName = ref("");
const stormCoords = ref("[]");

const emptyCurrentStorm = computed(() => currentStorm.value.length === 0);

const saveDisabled = computed(
  () => stormName.value === "" || emptyCurrentStorm.value,
);

function handleSubmit() {
  let coords: [number, number] | undefined = undefined;

  try {
    const parsedCoords = JSON.parse(stormCoords.value) as [number, number];

    if (Array.isArray(parsedCoords) && parsedCoords.length === 2) {
      coords = parsedCoords;
    }
  } catch (err) {
    console.error("Error parsing coords", err);
  }

  store.saveStorm(stormName.value, coords);

  stormName.value = "";
  stormCoords.value = "[]";

  currentStorm.value = [];
}

const gettingLocation = ref(false);

async function setCurrentLocation() {
  try {
    gettingLocation.value = true;

    stormCoords.value = JSON.stringify(await getUserLocation());
  } catch (err) {
    console.error("Error getting location", err);
  } finally {
    gettingLocation.value = false;
  }
}
</script>
