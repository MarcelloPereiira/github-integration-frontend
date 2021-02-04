import React from "react";
import Styled from "styled-components";
import Connect from "../store/config/connect";

const Header = (props) => {

  const { login, avatar_url } = props.auth.user;
  const { dispatch } = props;

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT"
    });
  } 

  return (
    <Head>
      <Left>
        <img src={avatar_url} alt="Avatar" width="50px" />
        <Name>{login}</Name>
      </Left>
      <button onClick={()=> handleLogout()}>Logout</button>
    </Head>
  );
};

export default Connect(Header);

const Left = Styled.div`
  display: flex;
  align-items: center;
`;

const Name = Styled.p`
  padding: 10px;
`;

const Head = Styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 30px;
  background-color: #f4f4f5;
  box-shadow: 0 0 5px 0 #999;
  color: #000;
  z-index: 1000;
`;
