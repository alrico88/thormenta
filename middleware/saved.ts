import { useStormStore } from "~/stores/storm";

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useStormStore();

  const { savedStorms } = storeToRefs(store);

  const idToSearch = to.params.id;

  if (!savedStorms.value.some((d) => d.id === idToSearch)) {
    return abortNavigation("Not found");
  }
});
