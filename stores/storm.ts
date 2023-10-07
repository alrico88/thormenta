import { nanoid } from "nanoid";
import { orderBy } from "lodash-es";

export interface StormItem {
  id: string;
  start: Date;
  end?: Date;
}

export const useStormStore = defineStore("stormStore", () => {
  const currentStorm = ref<StormItem[]>([]);

  const userCoords = shallowRef<[number, number] | null>(null);

  function sawLightning(): string {
    const id = nanoid();

    currentStorm.value.push({
      id,
      start: new Date(),
      end: undefined,
    });

    return id;
  }

  function heardThunder(id: string): void {
    const index = currentStorm.value.findIndex((d) => d.id === id);

    if (index === -1) {
      throw new Error("id not found");
    }

    currentStorm.value[index].end = new Date();
  }

  const sortedCurrentStorm = computed(() =>
    orderBy(currentStorm.value, (d) => d.start.getTime(), "desc"),
  );

  const hasPending = computed(() => {
    if (sortedCurrentStorm.value.length === 0) {
      return false;
    }

    return sortedCurrentStorm.value[0].end === undefined;
  });

  const savedStorms = useLocalStorage<
    {
      id: string;
      name: string;
      coords?: [number, number];
      stormData: StormItem[];
    }[]
  >("saved-storms", []);

  const sortedSavedStorms = computed(() =>
    orderBy(
      savedStorms.value,
      (d) => new Date(d.stormData[d.stormData.length - 1].start).getTime(),
      "desc",
    ),
  );

  const latestSavedStorms = computed(() => sortedSavedStorms.value.slice(0, 3));

  function saveStorm(name: string, coords?: [number, number]): void {
    savedStorms.value.push({
      id: nanoid(),
      name,
      coords,
      stormData: sortedCurrentStorm.value,
    });
  }

  function deleteSavedStorm(id: string): void {
    const confirmation = confirm("Are you sure you want to delete this storm?");

    if (!confirmation) {
      return;
    }

    const index = savedStorms.value.findIndex((d) => d.id === id);

    savedStorms.value.splice(index, 1);
  }

  async function setUserLocation() {
    userCoords.value = await getUserLocation();
  }

  return {
    currentStorm,
    sawLightning,
    heardThunder,
    sortedCurrentStorm,
    hasPending,
    savedStorms,
    saveStorm,
    deleteSavedStorm,
    sortedSavedStorms,
    latestSavedStorms,
    userCoords,
    setUserLocation,
  };
});
