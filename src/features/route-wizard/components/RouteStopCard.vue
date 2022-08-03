<template>
  <div class="RouteStopCard">
    <div class="RouteStopCard-header">
      <div class="RouteStopCard-name">
        {{ stop.name }}
      </div>

      <div class="RouteStopCard-address">
        <div class="RouteStopCard-addressIcon">
          <span class="material-icons-outlined">location_on</span>
        </div>
        {{ stop.address.street }} {{ stop.address.house_number }}<br />
        {{ stop.address.postal_code }} {{ stop.address.country }} {{ stop.address.town }}
      </div>

      <div class="RouteStopCard-time">
        <div class="RouteStopCard-timeIcon">
          <span class="material-icons-outlined">schedule</span>
        </div>
        {{ timeStart }} - {{ timeEnd }}
      </div>
    </div>

    <div class="RouteStopCard-body">
      <div class="RouteStopCard-orders">
        <div class="RouteStopCard-ordersTitle">
          <span>Orders</span>
          <span>{{ stop.orders.length }}</span>
        </div>

        <div class="RouteStopCard-ordersItems">
          <template v-for="order in stop.orders" :key="order.order_id">
            <div class="RouteStopCard-ordersItem">
              <div class="RouteStopCard-ordersItemIcon">
                <span class="material-icons">{{ order.type === 0 ? 'unarchive' : 'archive' }}</span>
              </div>
              {{ order.quantity }} x {{ order.size }} {{ order.stream_product_id }}
            </div>
          </template>
        </div>
      </div>

      <template v-if="$slots['controls']">
        <div class="RouteStopCard-controls">
          <slot name="controls" />
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue'
import { useDateFormat } from '@vueuse/core'
import { Stop } from '../types'

type Props = {
  stop: Stop
}

const props = defineProps<Props>()
const { stop } = toRefs(props)

const timeStart = useDateFormat(stop.value.time_start, 'HH:mm')
const timeEnd = useDateFormat(stop.value.time_end, 'HH:mm')
</script>

<style lang="scss" scoped>
.RouteStopCard {
  &-header,
  &-body {
    padding: 18px;
  }

  &-header {
    position: relative;
    border: 1px solid lightgray;
    border-bottom: none;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background-color: #46607f;
  }

  &-name {
    font-size: 18px;
    font-weight: 600;
    color: #ffffff;
  }

  &-address {
    position: relative;
    margin-top: 6px;
    padding-left: 32px;
    font-size: 13px;
    font-weight: 500;
    color: #ffffff;

    &Icon {
      position: absolute;
      left: 0;
      display: flex;
      align-items: center;
      height: 100%;
      font-weight: normal;
      color: #37ccbe;
    }
  }

  &-time {
    position: absolute;
    right: 18px;
    bottom: -17px;
    display: flex;
    align-items: center;
    height: 32px;
    padding-left: 28px;
    padding-right: 6px;
    border: 1px solid lightgray;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #3c3b4a;
    background-color: #ffffff;

    &Icon {
      position: absolute;
      left: 6px;
      height: 100%;
      display: flex;
      align-items: center;

      span {
        font-size: 18px;
        color: gray;
      }
    }
  }

  &-body {
    border: 1px solid lightgray;
    border-top: none;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  &-orders {
    padding: 0;

    &Title {
      font-weight: 600;

      span:first-of-type {
        text-transform: uppercase;
        font-size: 12px;
        color: #37ccbe;
      }

      span:last-of-type {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 16px;
        margin-left: 4px;
        border-radius: 50px;
        font-size: 11px;
        background: #f4f4f4;
      }
    }

    &Items {
      display: flex;
      flex-wrap: wrap;
      margin: 4px -4px -4px;
    }

    &Item {
      position: relative;
      margin: 4px;
      padding: 8px;
      padding-left: 24px;
      border-radius: 8px;
      font-size: 12px;
      color: #3c3b4a;
      background-color: #f4f4f4;

      &Icon {
        position: absolute;
        top: 0;
        left: 6px;
        height: 100%;
        display: flex;
        align-items: center;

        span {
          font-size: 14px;
          color: gray;
        }
      }
    }
  }

  &-controls {
    margin-top: 18px;
  }
}
</style>
