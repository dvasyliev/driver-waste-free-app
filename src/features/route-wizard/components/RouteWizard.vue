<template>
  <RouteStopCard :stop="data.stops[0]">
    <template #controls>
      <button>Itinerary</button>
      <button>Proceed</button>
    </template>
  </RouteStopCard>
</template>

<script lang="ts" setup>
import { getRoute } from '@/features/route-wizard'
import RouteStopCard from '@/features/route-wizard/components/RouteStopCard.vue'

const { data } = await getRoute()
</script>
