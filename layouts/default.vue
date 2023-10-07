<template lang="pug">
.h-100.d-flex.flex-column
  .flex-shrink-0.pb-3
    slot
  footer.mt-auto.border-top
    .container
      .row.py-3
        .col
          .hstack.gap-3.flex-wrap.justify-content-center
            div #[icon(name="bi:person")] Created by #[nuxt-link(:to="personalPage" v-bind="linkProps") Alberto Rico]
            div #[icon(name="bi:github")] Code on #[nuxt-link(:to="githubRepo" v-bind="linkProps") Github]
            div #[icon(name="bi:cup")] #[nuxt-link(:to="supportUrl" v-bind="linkProps") Support me!]
            
</template>

<script setup lang="ts">
const personalPage = "https://alrico.es";
const githubRepo = "https://github.com/alrico88/thormenta";
const supportUrl = "https://www.buymeacoffee.com/albertorico";

const linkProps = {
  target: "_blank",
};
</script>
