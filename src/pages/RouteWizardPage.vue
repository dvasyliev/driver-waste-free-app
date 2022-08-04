<template>
  <div class="RouteWizardPage">
    <div class="RouteWizardPage-topBar">ROUTE-NAME-1</div>
    <div class="RouteWizardPage-progressBar">
      <RouteWizardProgressBar />
    </div>
    <div class="RouteWizardPage-main">
      <RouteWizard />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { useRouteWizardStore, RouteWizard, RouteWizardProgressBar } from '@/features/route-wizard'

const route = useRoute()
const { routeId } = route.params
const routeWizardStore = useRouteWizardStore()

await routeWizardStore.getRoute(Number(routeId))
</script>

<style lang="scss" scoped>
.RouteWizardPage {
  &-topBar {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    padding: 0 36px;
    border-bottom: 1px solid #f5f5f5;
    font-size: 14px;
    font-weight: bold;
  }

  &-progressBar {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    padding: 0 36px;
    border-bottom: 1px solid #f5f5f5;
  }

  &-main {
    padding: 18px 36px;
  }
}
</style>
