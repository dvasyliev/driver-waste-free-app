<template>
  <RouterView v-slot="{ Component }">
    <AppLayout v-if="Component">
      <Transition mode="out-in">
        <KeepAlive>
          <Suspense>
            <component :is="Component" />
            <template #fallback> Loading... </template>
          </Suspense>
        </KeepAlive>
      </Transition>
    </AppLayout>
  </RouterView>
</template>

<script lang="ts" setup>
import AppLayout from './shared/layouts/AppLayout.vue'
</script>
