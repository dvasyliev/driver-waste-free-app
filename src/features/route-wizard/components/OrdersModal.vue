<template>
  <ElDialog
    :model-value="isActive"
    :show-close="false"
    :append-to-body="true"
    custom-class="OrdersModal"
    fullscreen
  >
    <template #header="{ titleId, titleClass }">
      <div class="OrdersModal-left">
        <ElButton class="OrdersModal-back" circle @click="onClose">
          <span class="material-icons">arrow_back</span>
        </ElButton>
      </div>

      <div class="OrdersModal-center">
        <div :id="titleId" :class="titleClass" class="OrdersModal-title">
          Reviewed orders<br />
          {{ numberOfReviewedOrders }}/{{ currentStopOrders.length }}
        </div>
      </div>

      <div class="OrdersModal-right">
        <div class="OrdersModal-stopNumber">Stop #{{ currentStop?.stop_id }}</div>
      </div>
    </template>

    <template v-for="order in currentStopOrders" :key="order.order_id">
      <OrderCard :order="order" />
    </template>

    <template v-if="!isAllOrdersReviewed">
      <ElAlert
        title="Review all orders before go further!"
        type="info"
        show-icon
        :closable="false"
        style="margin-bottom: 12px"
      />
    </template>

    <div class="OrdersModal-buttons">
      <ElButton
        class="OrdersModal-button"
        :disabled="!isAllOrdersReviewed"
        color="#34cdbf"
        @click="onComplete"
      >
        {{ nextStop ? 'Next stop' : 'Complete stop' }}
      </ElButton>
    </div>
  </ElDialog>
</template>

<script lang="ts" setup>
import { computed, ref, toRefs } from 'vue'
import { storeToRefs } from 'pinia'
import { Status } from '../enums'
import { useRouteWizardStore } from '../routeWizardStore'
import OrderCard from './OrderCard.vue'

type Props = {
  isActive: boolean
}
const props = defineProps<Props>()
const { isActive } = toRefs(props)

type Emit = {
  (event: 'update:isActive', isActive: boolean): void
}
const emit = defineEmits<Emit>()

const routeWizardStore = useRouteWizardStore()
const { currentStop, currentStopOrders, nextStop } = storeToRefs(routeWizardStore)

const numberOfReviewedOrders = computed(() => {
  return currentStopOrders.value.filter(({ status }) =>
    [Status.Completed, Status.Issue].includes(status),
  ).length
})
const isAllOrdersReviewed = computed(
  () => numberOfReviewedOrders.value === currentStopOrders.value.length,
)

function close() {
  emit('update:isActive', !isActive.value)
}

function onClose() {
  close()
}

async function onComplete() {
  if (isAllOrdersReviewed.value) {
    await routeWizardStore.completeCurrentStop()
    await routeWizardStore.updateCurrentRoute()
    close()
  }
}
</script>

<style lang="scss">
.OrdersModal {
  max-width: 800px !important;
  margin: 0 auto !important;

  &-back {
    span {
      font-size: 16px;
    }
  }

  &-title,
  &-stopNumber {
    color: #ffffff;
    text-align: center;
  }

  &-button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    margin: 0 auto;
    padding: 0 36px;
    border-radius: 8px;
    box-shadow: none;
    font-weight: bold;
    text-transform: uppercase;

    &,
    &:hover {
      color: #ffffff;
    }
  }

  .el-dialog {
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0;
      padding: 16px;
      background-color: #446080;
    }
  }
}
</style>
