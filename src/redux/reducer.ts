import { AppActions, IAppAction } from "./actions";
import { IAppState, initialState } from "./state";

export const Reducer = (
  state: IAppState = initialState,
  action: IAppAction
): IAppState => {
  const newState = { ...state };
  switch (action.type) {
    case AppActions.UPDATE_BATCH:
      newState.batches = action.payload.batches;
      return newState;
    case AppActions.UPDATE_CIRRICULA:
      newState.cirricula = action.payload.cirricula;
      return newState;
    case AppActions.UPDATE_CLIENT:
      newState.clients = action.payload.clients;
      return newState;
    case AppActions.UPDATE_DEMAND:
      newState.demands = action.payload.demands;
      return newState;
    case AppActions.UPDATE_SKILL:
      newState.skills = action.payload.skills;
      return newState;
    case AppActions.UPDATE_TRAINER:
      newState.trainers = action.payload.trainers;
      return newState;
    default:
      return newState;
  }
};