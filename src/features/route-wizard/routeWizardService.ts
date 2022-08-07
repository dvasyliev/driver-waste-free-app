import cloneDeep from 'lodash/cloneDeep'
import findIndex from 'lodash/findIndex'
import routeData from './routeDataMock.json'
import { Order, Route, Stop } from './types'

type Storage = {
  route: Route
}

const storage: Storage = {
  route: routeData,
}

export const getRoute = (routeId: Route['route_id']): Promise<{ data: Route }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (storage.route.route_id === routeId) {
        return resolve({ data: cloneDeep(storage.route) })
      }

      reject({ error: { message: `Route ${routeId} not found` } })
    }, 200)
  })
}

export const updateRoute = (
  routeId: Route['route_id'],
  data: Partial<Route>,
): Promise<{ data: Route }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (storage.route.route_id === routeId) {
        storage.route = { ...storage.route, ...data }

        return resolve({ data: cloneDeep(storage.route) })
      }

      reject({ error: { message: `Route ${routeId} not found` } })
    }, 200)
  })
}

export const updateStop = (
  stopId: Stop['stop_id'],
  data: Partial<Stop>,
): Promise<{ data: Stop }> => {
  let newStop: Stop

  storage.route.stops.forEach((stop, index) => {
    if (stop.stop_id === stopId) {
      newStop = { ...stop, ...data }
      storage.route.stops[index] = newStop
    }
  })

  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: cloneDeep(newStop) }), 200)
  })
}

export const updateOrder = (
  stopId: Stop['stop_id'],
  orderId: Order['order_id'],
  data: Partial<Order>,
): Promise<{ data: Order }> => {
  let newOrder: Order
  const stopIndex = findIndex(storage.route.stops, { stop_id: stopId })

  storage.route.stops[stopIndex].orders.forEach((order, index) => {
    if (order.order_id === orderId) {
      newOrder = { ...order, ...data }
      storage.route.stops[stopIndex].orders[index] = newOrder
    }
  })

  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: cloneDeep(newOrder) }), 200)
  })
}
