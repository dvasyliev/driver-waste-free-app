import cloneDeep from 'lodash/cloneDeep'
import routeData from './routeDataMock.json'
import { Route, Stop } from './types'

type Storage = {
  route: Route
}

const storage: Storage = {
  route: routeData,
}

export const getRoute = (id: Route['route_id']): Promise<{ data: Route }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (storage.route.route_id === id) {
        return resolve({ data: cloneDeep(storage.route) })
      }

      reject({ error: { message: `Route ${id} not found` } })
    }, 200)
  })
}

export const updateRoute = (
  id: Route['route_id'],
  data: Partial<Route>,
): Promise<{ data: Route }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (storage.route.route_id === id) {
        storage.route = { ...storage.route, ...data }

        return resolve({ data: cloneDeep(storage.route) })
      }

      reject({ error: { message: `Route ${id} not found` } })
    }, 200)
  })
}

export const updateStop = (id: Stop['stop_id'], data: Partial<Stop>): Promise<{ data: Stop }> => {
  let newStop: Stop

  storage.route.stops.forEach((stop, index) => {
    if (stop.stop_id === id) {
      newStop = { ...stop, ...data }
      storage.route.stops[index] = newStop
    }
  })

  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: newStop }), 200)
  })
}
