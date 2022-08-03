type Avatar = string | null
type Comment = string | null
type Dropoff = boolean
type OrderType = number
type Status = number
type Telephone = string | null

// type Status = 'new' | 'pending' | 'scheduled' | 'in_progress' | 'completed'
// type OrderType = 'pickup' | 'dropoff'
// type IssueType =
//   | 'other'
//   | 'wrong_quantity_ordered'
//   | 'wrong_container_type'
//   | 'container_not_accessible'

type TimeData = {
  eta?: string
  time_end: string
  time_start: string
}

type Orgloc = {
  orgloc_id: string
}

type Driver = {
  driver_id: string
}

type Vehicle = {
  vehicle_id: string
}

export type Address = {
  country: string
  house_number: string
  lat: number
  lon: number
  postal_code: string
  street: string
  town: string
}

export type Order = {
  order_id: string
  quantity: number
  size: number
  status: Status
  stream_product_id: number
  stream_type: string
  type: OrderType
}

// export type OrderIssue = {
//   comment: Comment
//   driver_id: Driver['driver_id']
//   order_id: Order['order_id']
//   type: IssueType
// }

export type Stop = TimeData & {
  address: Address
  avatar: Avatar
  comment: Comment
  name: string
  orders: Order[]
  status: Status
  stop_id: number
  telephone: Telephone
}

export type Depot = TimeData & {
  address: Address
  avatar: Avatar
  dropoff: Dropoff
  name: string
  orders: Order[]
  orgloc_id: Orgloc['orgloc_id']
  telephone: Telephone
}

export type Garage = TimeData & {
  address: Address
  avatar: Avatar
  dropoff: Dropoff
  name: string
  orders: Order[]
  orgloc_id: Orgloc['orgloc_id']
  stop_id: Stop['stop_id']
  telephone: Telephone
}

export type Route = {
  depots: Depot[]
  driver_id: Driver['driver_id']
  garage: Garage
  name: string
  orglog_id: Orgloc['orgloc_id']
  status: Status
  stops: Stop[]
  vehicle_id: Vehicle['vehicle_id']
  _created: string
  _modified: string
  _active: boolean
}
