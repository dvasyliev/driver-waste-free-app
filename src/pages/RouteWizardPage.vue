<template>
  <RouteWizardModule :route-id="Number(routeId)" />
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { RouteWizardModule } from '../features/route-wizard'

const route = useRoute()
const { routeId } = route.params
</script>
