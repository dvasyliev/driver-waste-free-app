<template>
  <div class="AppLayout">
    <div class="AppLayout-main">
      <slot />
    </div>

    <div id="modal" class="AppLayout-modals" />
  </div>
</template>

<style lang="scss" scoped>
.AppLayout {
  background-color: #f4f4f4;

  &-main {
    max-width: 800px;
    min-height: 100vh;
    margin: 0 auto;
    background-color: #ffffff;
  }
}
</style>
