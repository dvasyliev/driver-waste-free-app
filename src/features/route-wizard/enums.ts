export enum Status {
  New = 0,
  Pending = 1,
  Scheduled = 2,
  InProgress = 3,
  Completed = 4,
}

export enum OrderType {
  Pickup = 0,
  Dropoff = 1,
}

export enum IssueType {
  Other = 0,
  WrongQuantityOrdered = 1,
  WrongContainerType = 2,
  ContainerNotAccessible = 3,
}
