<template lang="pug">
.list-group-item
  .hstack.gap-2.align-items-center.justify-content-between
    div
      slot(name="left")
    div
      slot(name="right")
</template>
