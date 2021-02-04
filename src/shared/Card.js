import React from "react";
import Styled from "styled-components";
import { withRouter } from 'react-router-dom';

const Card = (props) => {
  const { avatar_url, login, full_name, onClick } = props;
  return (
    <Container onClick={() => onClick ? onClick() : () => {}}>
      {full_name && <P>{full_name}</P>}
      {avatar_url && <img src={avatar_url} alt="Avatar" style={{width: 40, height: 40}} />}
      {login && <P>{login}</P>}
    </Container>
  );
};

export default withRouter(Card);

const P = Styled.p`
  padding: 10px;
`;

const Container = Styled.header`
  display: flex;
  align-items: center;
  padding: 5px 30px;
  background-color: #f4f4f5;
  box-shadow: 0 0 5px 0 #999;
  color: #000;
  min-width: 500px;
`;
