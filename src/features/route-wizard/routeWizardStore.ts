import { defineStore } from 'pinia'
import find from 'lodash/find'
import findIndex from 'lodash/findIndex'
import { Order, Route, Stop } from './types'
import { Status } from './enums'
import { getRoute, updateStop, updateRoute, updateOrder } from './routeWizardService'

type State = {
  route: Route | null
}

const initialState: State = {
  route: null,
}

export const useRouteWizardStore = defineStore('routeWizard', {
  state: () => initialState,

  getters: {
    stops({ route }) {
      return route?.stops || []
    },
    numberOfStops(): number {
      return this.stops.length
    },
    nextStop(): Stop | null {
      return find(this.stops, { status: Status.Scheduled }) || null
    },
    currentStop(): Stop | null {
      return find(this.stops, { status: Status.InProgress }) || null
    },
    currentStopNumber(): number {
      const index = findIndex(this.stops, { stop_id: this.currentStop?.stop_id })

      return index >= 0 ? index + 1 : NaN
    },
    isRouteCompleted(): boolean {
      return this.route?.status === Status.Completed
    },
    currentProgress(): number {
      return this.isRouteCompleted
        ? 100
        : (((this.currentStopNumber - 1) / this.numberOfStops) * 100) | 0
    },
  },

  actions: {
    async getRoute(id: Route['route_id']) {
      try {
        const { data } = await getRoute(id)

        this.route = data
      } catch (error) {
        return error
      }
    },

    async completeCurrentStop() {
      if (this.currentStop) {
        await updateStop(this.currentStop.stop_id, { status: Status.Completed })
      }

      if (this.nextStop) {
        await updateStop(this.nextStop.stop_id, { status: Status.InProgress })
      } else if (this.route) {
        await updateRoute(this.route.route_id, { status: Status.Completed })
      }
    },

    async updateOrderQuantity(orderId: Order['order_id'], quantity: Order['quantity']) {
      if (this.currentStop) {
        await updateOrder(this.currentStop?.stop_id, orderId, { quantity })
      }
    },
  },
})
