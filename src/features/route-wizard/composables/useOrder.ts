import { computed, Ref } from 'vue'
import { Order } from '../types'
import { Status } from '../enums'
import { useRouteWizardStore } from '../routeWizardStore'

const MIN_ORDER_QUANTITY = 0
const MAX_ORDER_QUANTITY = 100

export const useOrder = (order: Ref<Order>) => {
  const routeWizardStore = useRouteWizardStore()

  enum ActionTypes {
    Issue = 'issue',
    Completed = 'completed',
  }
  const action = computed({
    get: () => {
      if (order.value.status === Status.Issue) return ActionTypes.Issue
      if (order.value.status === Status.Completed) return ActionTypes.Completed
      return null
    },
    set: (value) => value,
  })

  const canDecrease = computed(() => order.value.quantity > MIN_ORDER_QUANTITY)
  const canIncrease = computed(() => order.value.quantity < MAX_ORDER_QUANTITY)
  const canIssue = computed(() => action.value !== ActionTypes.Issue)
  const canComplete = computed(() => action.value !== ActionTypes.Completed)

  async function decrease() {
    if (canDecrease.value) {
      await routeWizardStore.updateOrderQuantity(order.value.order_id, order.value.quantity - 1)
      await routeWizardStore.updateCurrentRoute()
    }
  }

  async function increase() {
    if (canIncrease.value) {
      await routeWizardStore.updateOrderQuantity(order.value.order_id, order.value.quantity + 1)
      await routeWizardStore.updateCurrentRoute()
    }
  }

  async function issue() {
    if (canIssue.value) {
      await routeWizardStore.issueOrder(order.value.order_id)
      await routeWizardStore.updateCurrentRoute()
      action.value = ActionTypes.Issue
    }
  }

  async function complete() {
    if (canComplete.value) {
      await routeWizardStore.completeOrder(order.value.order_id)
      await routeWizardStore.updateCurrentRoute()
      action.value = ActionTypes.Completed
    }
  }

  return {
    canDecrease,
    canIncrease,
    canIssue,
    canComplete,

    decrease,
    increase,
    issue,
    complete,
  }
}
