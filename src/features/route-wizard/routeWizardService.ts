import routeData from './routeDataMock.json'
import { Route } from './types'

export type RouteResponse = {
  data: Route
}

export const getRoute = (): Promise<RouteResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: routeData }), 200)
  })
}
