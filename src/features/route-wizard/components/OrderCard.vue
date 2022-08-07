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
          <ElButton
            class="OrderCard-quantityControl"
            :disabled="order.quantity === MIN_ORDER_QUANTITY"
            color="#34cdbf"
            circle
            @click="onDecrease"
          >
            <span class="material-icons">remove</span>
          </ElButton>

          <div class="OrderCard-quantityAmount">
            {{ order.quantity }}
          </div>

          <ElButton
            class="OrderCard-quantityControl"
            :disabled="order.quantity === MAX_ORDER_QUANTITY"
            color="#34cdbf"
            circle
            @click="onIncrease"
          >
            <span class="material-icons">add</span>
          </ElButton>
        </div>
      </div>
    </div>

    <div class="OrderCard-right">
      <div class="OrderCard-type">{{ order.type === 0 ? 'Pickup' : 'Placement' }}</div>
      <div class="OrderCard-actions">
        <ElButton
          class="OrderCard-action --issue"
          :disabled="action === ActionTypes.Issue"
          :plain="action !== ActionTypes.Issue"
          color="#ffc057"
          circle
          @click="onIssue"
        >
          <span class="material-icons">warning</span>
        </ElButton>

        <ElButton
          class="OrderCard-action --completed"
          :disabled="action === ActionTypes.Completed"
          :plain="action !== ActionTypes.Completed"
          color="#34cdbf"
          circle
          @click="onComplete"
        >
          <span class="material-icons">done</span>
        </ElButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue'
import { Status } from '../enums'
import { useRouteWizardStore } from '../routeWizardStore'
import { Order } from '../types'

const MIN_ORDER_QUANTITY = 0
const MAX_ORDER_QUANTITY = 100

type Props = {
  order: Order
}
const props = defineProps<Props>()
const { order } = toRefs(props)

const routeWizardStore = useRouteWizardStore()

enum ActionTypes {
  Issue = 'issue',
  Completed = 'completed',
}
const action = computed({
  get: () => {
    if (order.value.status === Status.Issue) return ActionTypes.Issue
    if (order.value.status === Status.Completed) return ActionTypes.Completed
    return null
  },
  set: (value) => value,
})

async function onDecrease() {
  if (order.value.quantity > MIN_ORDER_QUANTITY) {
    await routeWizardStore.updateOrderQuantity(order.value.order_id, order.value.quantity - 1)
    await routeWizardStore.updateCurrentRoute()
  }
}

async function onIncrease() {
  if (order.value.quantity < MAX_ORDER_QUANTITY) {
    await routeWizardStore.updateOrderQuantity(order.value.order_id, order.value.quantity + 1)
    await routeWizardStore.updateCurrentRoute()
  }
}

async function onIssue() {
  if (action.value !== ActionTypes.Issue) {
    await routeWizardStore.issueOrder(order.value.order_id)
    await routeWizardStore.updateCurrentRoute()
    action.value = ActionTypes.Issue
  }
}

async function onComplete() {
  if (action.value !== ActionTypes.Completed) {
    await routeWizardStore.completeOrder(order.value.order_id)
    await routeWizardStore.updateCurrentRoute()
    action.value = ActionTypes.Completed
  }
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

    &:hover {
      color: #ffffff !important;
    }

    &.--issue {
      &.is-plain {
        color: #ffc057;
      }

      &.is-disabled {
        background-color: #ffc057;
        cursor: default;
      }
    }

    &.--completed {
      &.is-plain {
        color: #34cdbf;
      }

      &.is-disabled {
        background-color: #34cdbf;
        cursor: default;
      }
    }
  }
}
</style>
