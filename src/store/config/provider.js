
import React, { useReducer } from "react";
import Context from "./config";
import { initialState as authStore, reducer as authReducer } from "../reducer/auth";
import { initialState as usersStore, reducer as usersReducer } from "../reducer/users";

const Store = props => {
  const [authState, authDispatch] = useReducer(
    authReducer,
    authStore
  );

  const [usersState, usersDispatch] = useReducer(
    usersReducer,
    usersStore
  );

  const triggerDispatchs = action => {
    const dispatchs = [authDispatch, usersDispatch];
    for (let i = 0; i < dispatchs.length; i++) {
      dispatchs[i](action);
    }
  };

  const combinedReducers = {
    store: {
      auth: authState,
      users: usersState
    },
    dispatch: action => triggerDispatchs(action)
  };

  return (
    <Context.Provider value={combinedReducers}>
      {props.children}
    </Context.Provider>
  );
};

export default Store;