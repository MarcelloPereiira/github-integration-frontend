import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import Styled from "styled-components";
import Card from "../shared/Card";
import Header from "../shared/Header";
import Connect from "../store/config/connect";

const Home = (props) => {
  const { isLoggedIn, proxy_url } = props.auth;
  const { dispatch } = props;
  const { users } = props.users;

  useEffect(() => {
    fetch(`${proxy_url}/users?since=2&per_page=4`)
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: "USERS",
          payload: { users: data },
        });
      });
  }, []);

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }

  console.log(users)
  return (
    <Wrapper>
      <div className="container">
        <Header />
        <div>
          <div className="content">{
          users && users.map(
            (user, index) => 
              <Card key={index} id={user.id} avatar_url={user.avatar_url} login={user.login} />
            )}</div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Connect(Home);

const Wrapper = Styled.section`
.container{
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: Arial;

  button{
    all: unset;
    width: 100px;
    height: 35px;
    margin: 10px 10px 0 0;
    align-self: flex-end;
    background-color: #0041C2;
    color: #fff;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #0041C2;

    &:hover{
      background-color: #fff;
      color: #0041C2;
    }
  }

  >div{
    height: 100%;
    width: 100%;
    display: flex;
    font-size: 18px;
    justify-content: center;
    align-items: center;

    .content{
      display: flex;
      flex-direction: column;
      padding: 20px 100px;    
      width: auto;
  
      img{
        height: 150px;
        width: 150px;
        border-radius: 50%;
      }
  
      >span:nth-child(2){
        margin-top: 20px;
        font-weight: bold;
      }
  
      >span:not(:nth-child(2)){
        margin-top: 8px;
        font-size: 14px;
      }
  
    }

  }
}
`;
