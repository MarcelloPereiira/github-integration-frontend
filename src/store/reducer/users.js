export const initialState = {
    users: [{
        id: '1',
        login: "MarcelloPereira",
        avatar_url: "https://avatars.githubusercontent.com/u/35543029?v=4"
    }]
}
  
  export const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "USERS": {
        return {
          ...state,
          users: action.payload.users
        };
      }
      default:
        return state;
    }
  };
  