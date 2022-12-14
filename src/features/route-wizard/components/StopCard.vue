<template>
  <div class="StopCard">
    <div class="StopCard-header">
      <div class="StopCard-name">
        {{ stop.name }}
      </div>

      <div class="StopCard-address">
        <div class="StopCard-addressIcon">
          <span class="material-icons-outlined">location_on</span>
        </div>
        {{ stop.address.street }} {{ stop.address.house_number }}<br />
        {{ stop.address.postal_code }} {{ stop.address.country }} {{ stop.address.town }}
      </div>

      <div class="StopCard-time">
        <div class="StopCard-timeIcon">
          <span class="material-icons-outlined">schedule</span>
        </div>
        {{ timeStart }} - {{ timeEnd }}
      </div>
    </div>

    <div class="StopCard-body">
      <div class="StopCard-orders">
        <div class="StopCard-ordersTitle">
          <span>Orders</span>
          <span>{{ stop.orders.length }}</span>
        </div>

        <div class="StopCard-ordersItems">
          <template v-for="order in stop.orders" :key="order.order_id">
            <div class="StopCard-ordersItem">
              <div class="StopCard-ordersItemIcon">
                <span class="material-icons">{{ order.type === 0 ? 'unarchive' : 'archive' }}</span>
              </div>
              {{ order.quantity }} x {{ order.size }} {{ order.stream_product_name }}
            </div>
          </template>
        </div>
      </div>

      <template v-if="stop.comment">
        <div class="StopCard-comment"><span>Comment:</span> {{ stop.comment }}</div>
      </template>

      <template v-if="stop.telephone">
        <div class="StopCard-telephone">
          <span>Telephone:</span> <a :href="`tel:${stop.telephone}`">{{ stop.telephone }}</a>
        </div>
      </template>

      <div class="StopCard-buttons">
        <ElButton class="StopCard-button" color="#37ccbe" @click="onItinerary">
          Itinerary
          <span class="material-icons">directions</span>
        </ElButton>

        <ElButton class="StopCard-button" color="#37ccbe" @click="emit('proceed')">
          Proceed
          <span class="material-icons">done</span>
        </ElButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue'
import { useDateFormat } from '@vueuse/core'
import { Stop } from '../types'

type Props = {
  stop: Stop
}
const props = defineProps<Props>()
const { stop } = toRefs(props)

type Emit = {
  (event: 'proceed'): void
}
const emit = defineEmits<Emit>()

const timeStart = useDateFormat(stop.value.time_start, 'HH:mm')
const timeEnd = useDateFormat(stop.value.time_end, 'HH:mm')
const addressQuery = computed(() => {
  const { house_number, street, town, country, postal_code } = stop.value.address

  return `${house_number} ${street}, ${town}, ${country}, ${postal_code}`
})

function onItinerary() {
  window.open(`http://maps.google.com/?q=${addressQuery.value}`, '_blank')
}
</script>

<style lang="scss" scoped>
.StopCard {
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

  &-comment,
  &-telephone {
    margin-top: 12px;
    font-size: 14px;
    color: #3c3b4a;

    span {
      font-weight: 500;
    }
  }

  &-buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 12px -6px -6px;
  }

  &-button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 64px;
    margin: 6px;
    padding: 0 36px;
    border-radius: 8px;
    box-shadow: none;
    font-weight: bold;
    text-transform: uppercase;
    color: #ffffff;

    span {
      display: block;
      margin-left: 12px;
      font-size: 36px;
    }
  }
}
</style>
