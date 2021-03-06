export const initialState = {
    users: [],
    loading: false
}
  
  export const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_USERS":
        return {
          ...state,
          loading: true,
          users: []
        }
      case "USERS": {
        return {
          ...state,
          loading: false,
          users: action.payload.users
        };
      }
      default:
        return state;
    }
  };
  