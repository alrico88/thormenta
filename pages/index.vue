<template lang="pug">
.container
  .row.py-4.py-md-5.align-items-center.g-3
    .col
      h1 #[span.text-title Thor]menta
      .lead Calculate the distance to a storm based on the lightning-thunder delay.
    .col-4.col-sm-5.text-end
      img(src="/flash.png", alt="Thormenta Logo", :height="80")
  //- the-counter
  .vstack.gap-3
    current-storm
    save-storm
    latest-storms
</template>

<script setup lang="ts">
useHead({
  title: "Thormenta",
  meta: [
    {
      name: "description",
      content:
        "Calculate the distance to a storm based on the lightning-thunder delay",
    },
    {
      name: "keywords",
      content: "lightning,thunder,distance,storm",
    },
  ],
});
</script>
