<template>
  <div class="RouteWizard">
    <div class="RouteWizard-topBar">{{ route?.name }}</div>

    <div class="RouteWizard-progressBar">
      <ElProgress :percentage="routeProgress" color="#37ccbe" style="width: 100%" />
    </div>

    <div class="RouteWizard-main">
      <template v-if="isRouteCompleted">
        <div class="RouteWizard-routeCompleted">
          <span class="material-icons">check_circle</span>
          <h3>Route completed!</h3>
        </div>
      </template>
      <template v-else-if="currentStop">
        <StopCard :stop="currentStop" @proceed="onProceed" />
        <RouteSummary class="RouteWizard-summary" />
        <OrdersModal v-model:is-active="isModalActive" />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, toRefs } from 'vue'
import { storeToRefs } from 'pinia'
import { Route } from './types'
import { useRouteWizardStore } from './routeWizardStore'
import StopCard from './components/StopCard.vue'
import RouteSummary from './components/RouteSummary.vue'
import OrdersModal from './components/OrdersModal.vue'

type Props = {
  routeId: Route['route_id']
}
const props = defineProps<Props>()
const { routeId } = toRefs(props)

const routeWizardStore = useRouteWizardStore()
const { route, currentStop, isRouteCompleted, routeProgress } = storeToRefs(routeWizardStore)

routeWizardStore.getRoute(routeId.value)

const isModalActive = ref(false)

async function onProceed() {
  isModalActive.value = true
}
</script>

<style lang="scss" scoped>
.RouteWizard {
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

  &-routeCompleted {
    margin-top: 64px;
    text-align: center;
    color: #37ccbe;

    span {
      font-size: 80px;
    }
  }

  &-summary {
    margin-top: 48px;
  }
}
</style>
