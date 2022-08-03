<template>
  <div class="RouteWizardPage">
    <div class="RouteWizardPage-topBar">ROUTE-NAME-1</div>
    <div class="RouteWizardPage-progressBar">
      <el-progress :percentage="50" color="#37ccbe" style="width: 100%" />
    </div>
    <div class="RouteWizardPage-main">
      <RouteWizard :route="data" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getRoute } from '@/features/route-wizard'
import { RouteWizard } from '@/features/route-wizard'

const { data } = await getRoute()

// const { route, isLoading, isReady, error, getRoute } = useRouteState()
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
