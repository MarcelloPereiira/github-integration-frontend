import React from "react";
import Styled from "styled-components";

const Card = (props) => {
  const { avatar_url, login, id } = props;
  return (
    <Container onClick={() => alert(id)}>
      <img src={avatar_url} alt="Avatar" style={{width: 40, height: 40}} />
      <P>{login}</P>
    </Container>
  );
};

export default Card;

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
