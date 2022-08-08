<template>
  <div class="Loading">
    <div class="Loading-element" />
  </div>
</template>

<style lang="scss" scoped>
.Loading {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: inherit;
  min-height: 100vh;
  background-color: #ffffff;

  &-element {
    display: inline-block;
    width: 80px;
    height: 80px;

    &:after {
      content: ' ';
      display: block;
      width: 64px;
      height: 64px;
      margin: 8px;
      border-radius: 50%;
      border: 6px solid #34cdbf;
      border-color: #34cdbf transparent #34cdbf transparent;
      animation: lds-dual-ring 1.2s linear infinite;
    }
  }
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
