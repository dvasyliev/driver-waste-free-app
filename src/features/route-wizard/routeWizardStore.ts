import { defineStore } from 'pinia'
import find from 'lodash/find'
import findIndex from 'lodash/findIndex'
import { Route, Stop } from './types'
import { Status } from './enums'
import { getRoute, updateStop, updateRoute } from './routeWizardService'

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
    isLastStop(): boolean {
      return this.currentStopNumber === this.numberOfStops
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
      if (this.currentStop?.stop_id) {
        await updateStop(this.currentStop?.stop_id, { status: Status.Completed })
      }

      if (this.nextStop?.stop_id) {
        await updateStop(this.nextStop?.stop_id, { status: Status.InProgress })
      }

      if (this.isLastStop && this.route) {
        await updateRoute(this.route.route_id, { status: Status.Completed })
      }
    },
  },
})