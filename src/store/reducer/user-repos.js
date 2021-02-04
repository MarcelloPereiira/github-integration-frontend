export const initialState = {
    userRepos: [],
    loading: false
}
  
  export const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_USER_REPOS": {
        return {
          ...state,
          loading: true
        };
      }
      case "USER_REPOS": {
        return {
          ...state,
          userRepos: action.payload.userRepos,
          loading: false
        };
      }
      default:
        return state;
    }
  };
  