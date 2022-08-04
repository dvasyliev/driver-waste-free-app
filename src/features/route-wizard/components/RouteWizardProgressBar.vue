<template>
  <el-progress :percentage="currentProgress" color="#37ccbe" style="width: 100%" />
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useRouteWizardStore } from '../routeWizardStore'

const routeWizardStore = useRouteWizardStore()
const { currentProgress } = storeToRefs(routeWizardStore)
</script>
