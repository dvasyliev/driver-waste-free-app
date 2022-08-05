<template>
  <template v-if="isRouteCompleted"> Route completed! </template>

  <template v-else-if="currentStop">
    <RouteStopCard :stop="currentStop" @itinerary="onItinerary" @proceed="onProceed" />
    <RouteSummary />
  </template>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useRouteWizardStore } from '../routeWizardStore'
import RouteStopCard from './RouteStopCard.vue'
import RouteSummary from './RouteSummary.vue'

const routeWizardStore = useRouteWizardStore()
const { route, currentStop, isRouteCompleted } = storeToRefs(routeWizardStore)

function onItinerary(query: string) {
  window.open(`http://maps.google.com/?q=${query}`, '_blank')
}

async function onProceed() {
  if (route.value) {
    await routeWizardStore.completeCurrentStop()
    await routeWizardStore.getRoute(route.value.route_id)
  }
}
</script>
