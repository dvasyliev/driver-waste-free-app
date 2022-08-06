<template>
  <div class="OrderCard">
    <div class="OrderCard-left"></div>

    <div class="OrderCard-center">
      <div class="OrderCard-title">
        {{ order.stream_product_name }}
        <span>{{ order.size }}</span>
      </div>

      <div class="OrderCard-quantity">
        <div class="OrderCard-quantityText">Adjust quantity (if needed)</div>
        <div class="OrderCard-quantityControls">
          <ElButton class="OrderCard-quantityControl" color="#34cdbf" circle @click="onDecrease">
            <span class="material-icons">add</span>
          </ElButton>

          <div class="OrderCard-quantityAmount">
            {{ order.quantity }}
          </div>

          <ElButton class="OrderCard-quantityControl" color="#34cdbf" circle @click="onIncrease">
            <span class="material-icons">remove</span>
          </ElButton>
        </div>
      </div>
    </div>

    <div class="OrderCard-right">
      <div class="OrderCard-type">{{ order.type === 0 ? 'Pickup' : 'Placement' }}</div>
      <div class="OrderCard-actions">
        <ElButton class="OrderCard-action" color="#ffc057" circle @click="onWarning">
          <span class="material-icons">warning</span>
        </ElButton>

        <ElButton class="OrderCard-action" color="#34cdbf" circle @click="onDone">
          <span class="material-icons">done</span>
        </ElButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'
import { Order } from '../types'

const MIN_ORDER_QUANTITY = 0
const MAX_ORDER_QUANTITY = 100

type Props = {
  order: Order
}

type Emit = {
  (event: 'decrease', quantity: number): void
  (event: 'increase', quantity: number): void
  (event: 'warning'): void
  (event: 'done'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()
const { order } = toRefs(props)

function onDecrease() {
  if (order.value.quantity > MIN_ORDER_QUANTITY) {
    emit('decrease', order.value.quantity - 1)
  }
}

function onIncrease() {
  if (order.value.quantity < MAX_ORDER_QUANTITY) {
    emit('increase', order.value.quantity + 1)
  }
}

function onWarning() {
  emit('warning')
}

function onDone() {
  emit('done')
}
</script>

<style lang="scss" scoped>
.OrderCard {
  display: flex;
  border: 1px solid lightgray;
  border-radius: 8px;

  &:not(:last-of-type) {
    margin-bottom: 18px;
  }

  &-left {
    width: 8px;
    background-color: #0ca600;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  &-center {
    flex-grow: 1;
    padding: 18px;
  }

  &-title {
    font-size: 14px;
    font-weight: bold;

    span {
      font-weight: normal;
    }
  }

  &-quantity {
    margin-top: 6px;

    &Text {
      font-size: 10px;
      color: gray;
    }

    &Controls {
      display: flex;
      align-items: center;
      margin-top: 12px;
    }

    &Amount {
      margin: 0 8px;
      font-size: 24px;
    }

    &Control {
      width: 30px;
      height: 30px;
      color: #ffffff;

      span {
        font-size: 16px;
      }
    }
  }

  &-right {
    padding: 18px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  &-type {
    text-align: right;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: bold;
  }

  &-actions {
    display: flex;
    margin-top: 18px;
  }

  &-action {
    width: 50px;
    height: 50px;
    color: #ffffff;
  }
}
</style>
