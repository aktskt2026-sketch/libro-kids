import {
  parkBin,
  parkLitter,
  parkStart,
  type ParkPoint,
} from "../data/park-game.ts";

export const pickupRadius = 10;
export const deliveryRadius = 12;
export interface ParkState {
  started: boolean;
  position: ParkPoint;
  collected: string[];
  delivered: string[];
}
export type ParkAction =
  | { type: "start" }
  | { type: "move"; position: ParkPoint }
  | { type: "collect" }
  | { type: "deliver" };
export function initialParkState(): ParkState {
  return {
    started: false,
    position: { ...parkStart },
    collected: [],
    delivered: [],
  };
}
export function parkDistance(a: ParkPoint, b: ParkPoint) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}
export function nearestParkLitter(state: ParkState) {
  return parkLitter
    .filter((item) => !state.collected.includes(item.id))
    .sort(
      (a, b) =>
        parkDistance(a.position, state.position) -
        parkDistance(b.position, state.position),
    )[0];
}
export function parkReducer(state: ParkState, action: ParkAction): ParkState {
  if (action.type === "start") return { ...state, started: true };
  if (!state.started || state.delivered.length === parkLitter.length)
    return state;
  if (action.type === "move") {
    if (
      !Number.isFinite(action.position.x) ||
      !Number.isFinite(action.position.y)
    )
      return state;
    return {
      ...state,
      position: {
        x: Math.max(5, Math.min(95, action.position.x)),
        y: Math.max(5, Math.min(95, action.position.y)),
      },
    };
  }
  if (action.type === "collect") {
    const item = nearestParkLitter(state);
    if (!item || parkDistance(item.position, state.position) > pickupRadius)
      return state;
    return { ...state, collected: [...state.collected, item.id] };
  }
  if (
    parkDistance(parkBin, state.position) > deliveryRadius ||
    state.delivered.length === state.collected.length
  )
    return state;
  return { ...state, delivered: [...state.collected] };
}
