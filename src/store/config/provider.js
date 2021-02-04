
import React, { useReducer } from "react";
import Context from "./config";
import { initialState as authStore, reducer as authReducer } from "../reducer/auth";
import { initialState as usersStore, reducer as usersReducer } from "../reducer/users";
import { initialState as userReposStore, reducer as userReposReducer } from "../reducer/user-repos";

const Store = props => {
  const [authState, authDispatch] = useReducer(
    authReducer,
    authStore
  );

  const [usersState, usersDispatch] = useReducer(
    usersReducer,
    usersStore
  );

  const [userReposState, userReposDispatch] = useReducer(
    userReposReducer,
    userReposStore
  );

  const triggerDispatchs = action => {
    const dispatchs = [authDispatch, usersDispatch, userReposDispatch];
    for (let i = 0; i < dispatchs.length; i++) {
      dispatchs[i](action);
    }
  };

  const combinedReducers = {
    store: {
      auth: authState,
      users: usersState,
      userRepos: userReposState
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