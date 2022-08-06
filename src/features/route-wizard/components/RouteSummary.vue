<template>
  <div class="RouteSummary">
    <div class="RouteSummary-info">
      <template v-if="isLastStop">This is the last stop</template>
      <template v-else-if="isLastButNotOneStop">
        1 stop out of {{ numberOfStops }} left. Here is the last stop
      </template>
      <template v-else>
        {{ numberOfLeftStops }} stops out of {{ numberOfStops }} left. Here is the next stop
      </template>
    </div>

    <template v-if="nextStop">
      <div class="RouteSummary-nextStop">
        {{ nextStop.address.street }} {{ nextStop.address.house_number }}<br />
        {{ nextStop.address.postal_code }} {{ nextStop.address.country }}
        {{ nextStop.address.town }}
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRouteWizardStore } from '../routeWizardStore'

const routeWizardStore = useRouteWizardStore()
const { numberOfStops, nextStop, currentStopNumber } = storeToRefs(routeWizardStore)

const isLastButNotOneStop = computed(() => currentStopNumber.value === numberOfStops.value - 1)
const isLastStop = computed(() => currentStopNumber.value === numberOfStops.value)
const numberOfLeftStops = computed(() => numberOfStops.value - currentStopNumber.value)
</script>
