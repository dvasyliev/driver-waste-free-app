<template>
  <div class="OrderCard">
    <div
      class="OrderCard-left"
      :style="{ backgroundColor: order.stream_product_background_color || '#446080' }"
    ></div>

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
            :disabled="!canDecrease"
            color="#34cdbf"
            circle
            @click="decrease"
          >
            <span class="material-icons">remove</span>
          </ElButton>

          <div class="OrderCard-quantityAmount">
            {{ order.quantity }}
          </div>

          <ElButton
            class="OrderCard-quantityControl"
            :disabled="!canIncrease"
            color="#34cdbf"
            circle
            @click="increase"
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
          :disabled="!canIssue"
          :plain="canIssue"
          color="#ffc057"
          circle
          @click="issue"
        >
          <span class="material-icons">warning</span>
        </ElButton>

        <ElButton
          class="OrderCard-action --completed"
          :disabled="!canComplete"
          :plain="canComplete"
          color="#34cdbf"
          circle
          @click="complete"
        >
          <span class="material-icons">done</span>
        </ElButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'
import { Order } from '../types'
import { useOrder } from '../composables/useOrder'

type Props = {
  order: Order
}
const props = defineProps<Props>()
const { order } = toRefs(props)

const { canDecrease, canIncrease, canIssue, canComplete, decrease, increase, issue, complete } =
  useOrder(order)
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
    position: relative;
    width: 8px;
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
