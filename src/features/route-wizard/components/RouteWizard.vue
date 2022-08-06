<template>
  <template v-if="isRouteCompleted"> Route completed! </template>

  <template v-else-if="currentStop">
    <StopCard :stop="currentStop" @itinerary="onItinerary" @proceed="onProceed" />
    <RouteSummary />
    <OrdersModal v-model="isModalActive" :orders="currentStop.orders" />
  </template>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRouteWizardStore } from '../routeWizardStore'
import StopCard from './StopCard.vue'
import RouteSummary from './RouteSummary.vue'
import OrdersModal from './OrdersModal.vue'

const routeWizardStore = useRouteWizardStore()
const { currentStop, isRouteCompleted } = storeToRefs(routeWizardStore)
const isModalActive = ref(false)

function onItinerary(query: string) {
  window.open(`http://maps.google.com/?q=${query}`, '_blank')
}

async function onProceed() {
  isModalActive.value = true

  // if (route.value) {
  //   await routeWizardStore.completeCurrentStop()
  //   await routeWizardStore.getRoute(route.value.route_id)
  // }
}
</script>
