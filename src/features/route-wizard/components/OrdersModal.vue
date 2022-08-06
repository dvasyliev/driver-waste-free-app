<template>
  <ElDialog v-model="isActive" :show-close="false" custom-class="OrdersModal" fullscreen>
    <template #header="{ close, titleId, titleClass }">
      <div class="OrdersModal-left">
        <ElButton class="OrdersModal-back" circle @click="onClose(close)">
          <span class="material-icons">arrow_back</span>
        </ElButton>
      </div>

      <div class="OrdersModal-center">
        <div :id="titleId" :class="titleClass">
          Review orders<br />
          2/2
        </div>
      </div>

      <div class="OrdersModal-right">Stop #1</div>
    </template>

    <OrderCard v-for="order in orders" :key="order.order_id" :order="order" />
  </ElDialog>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'
import { Order } from '../types'
import OrderCard from './OrderCard.vue'

type Props = {
  orders: Order[]
  isActive: boolean
}

type Emit = {
  (event: 'update:isActive', isActive: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()
const { isActive, orders } = toRefs(props)

function onClose(close: () => void) {
  close()
  emit('update:isActive', !isActive.value)
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
