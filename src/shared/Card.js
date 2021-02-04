import React from "react";
import Styled from "styled-components";
import { withRouter } from 'react-router-dom';

const Card = (props) => {
  const { onClick } = props;
  return (
    <Container onClick={() => onClick ? onClick() : () => {}} >
      {props.children}
    </Container>
  );
};

export default withRouter(Card);

const Container = Styled.div`
  display: flex;
  align-items: center;
  padding: 5px 30px;
  background-color: #fff;
  box-shadow: 0 0 5px 0 #999;
  color: #000;
  max-width: 800px;
  width: 100%;
  cursor: pointer;
`;
