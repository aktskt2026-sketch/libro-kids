import test from "node:test";
import assert from "node:assert/strict";
import { initialParkState, parkReducer } from "../lib/park-game.ts";
import { parkBin, parkLitter } from "../data/park-game.ts";

test("park actions require proximity, keep unique items, and allow partial delivery", () => {
  let state = initialParkState();
  assert.equal(parkReducer(state, { type: "collect" }), state);
  state = parkReducer(state, { type: "start" });
  const started = state;
  assert.equal(parkReducer(state, { type: "deliver" }), state);
  state = parkReducer(state, { type: "move", position: { x: 95, y: 95 } });
  assert.equal(parkReducer(state, { type: "collect" }), state);
  state = parkReducer(state, {
    type: "move",
    position: parkLitter[0].position,
  });
  state = parkReducer(state, { type: "collect" });
  assert.deepEqual(state.collected, [parkLitter[0].id]);
  assert.equal(parkReducer(state, { type: "collect" }), state);
  assert.equal(parkReducer(state, { type: "deliver" }), state);
  state = parkReducer(state, { type: "move", position: parkBin });
  state = parkReducer(state, { type: "deliver" });
  assert.deepEqual(state.delivered, [parkLitter[0].id]);
  assert.equal(parkReducer(state, { type: "deliver" }), state);
  assert.deepEqual(started.collected, []);
});

test("park completes only after all 12 items reach the bin and movement stays on the board", () => {
  let state = parkReducer(initialParkState(), { type: "start" });
  state = parkReducer(state, { type: "move", position: { x: -10, y: 110 } });
  assert.deepEqual(state.position, { x: 5, y: 95 });
  assert.equal(
    parkReducer(state, { type: "move", position: { x: NaN, y: 5 } }),
    state,
  );
  for (const item of parkLitter) {
    state = parkReducer(state, { type: "move", position: item.position });
    state = parkReducer(state, { type: "collect" });
  }
  assert.equal(state.collected.length, 12);
  assert.equal(state.delivered.length, 0);
  state = parkReducer(state, { type: "move", position: parkBin });
  state = parkReducer(state, { type: "deliver" });
  assert.equal(state.delivered.length, 12);
  assert.equal(new Set(state.delivered).size, 12);
  assert.equal(
    parkReducer(state, { type: "move", position: { x: 20, y: 20 } }),
    state,
  );
});
