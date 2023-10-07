<template lang="pug">
.map-container
  template(v-if="!showLoading")
    l-map.h-100.w-100(
      :center="[0, 0]"
      :zoom="10"
      ref="mapRef"
      @ready="mapReady = true"
      :options="{scrollWheelZoom: false}"
    )
      l-tile-layer(:url="url")
      l-geo-json(:geojson="asCircle")
  .alert.alert-info.mb-0.h-100.d-flex.justify-content-center.align-items-center(v-else)
    div Getting coordinates...
</template>

<script setup lang="ts">
import type { Distance } from "~/composables/useDistance";
import circle from "@turf/circle";
import { useStormStore } from "~/stores/storm";
import { getGeoJSONBBox } from "bbox-helper-functions";

const props = defineProps<{
  distance: Distance;
  isCurrent: boolean;
  coords?: [number, number];
}>();

const emptyFeatCollection = {
  type: "FeatureCollection",
  features: [],
} as never;

const store = useStormStore();
const { userCoords } = storeToRefs(store);

const mapRef = templateRef("mapRef");
const mapReady = ref(false);

const url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const showLoading = computed(() => {
  if (props.isCurrent) {
    return userCoords.value === null;
  } else {
    return false;
  }
});

const asCircle = computed(() => {
  if (props.coords) {
    return createCircleFromCoords(
      props.coords,
      props.distance.distanceInMeters,
    );
  } else if (props.isCurrent) {
    if (!userCoords.value) {
      return emptyFeatCollection;
    } else {
      return createCircleFromCoords(
        userCoords.value,
        props.distance.distanceInMeters,
      );
    }
  } else {
    return emptyFeatCollection;
  }
});

watch([asCircle, mapReady], ([val, isReady]) => {
  const bbox = getGeoJSONBBox(val);
  const [minLon, minLat, maxLon, maxLat] = bbox;

  if (isReady && bbox.every((d) => d !== Infinity)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (mapRef.value as any).leafletObject.fitBounds([
      [minLat, minLon],
      [maxLat, maxLon],
    ]);
  }
});

onMounted(() => {
  if (props.isCurrent && !userCoords.value) {
    store.setUserLocation();
  }
});
</script>

<style lang="scss" scoped>
.map-container {
  height: 300px;
}
</style>
