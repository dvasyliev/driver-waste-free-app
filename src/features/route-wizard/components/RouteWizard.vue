<template>
  <template v-if="currentStop">
    <RouteStopCard :stop="currentStop">
      <template #controls>
        <button>Itinerary</button>
        <button @click="onProceed">Proceed</button>
      </template>
    </RouteStopCard>
    <RouteSummary />
  </template>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useRouteWizardStore } from '../routeWizardStore'
import RouteStopCard from './RouteStopCard.vue'
import RouteSummary from './RouteSummary.vue'

const routeWizardStore = useRouteWizardStore()
const { currentStop } = storeToRefs(routeWizardStore)

async function onProceed() {
  await routeWizardStore.completeCurrentStop()
  await routeWizardStore.getRoute()
}
</script>
