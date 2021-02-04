import React from "react";
import Styled from "styled-components";
import Connect from "../store/config/connect";
import ArrowLeftIcon from "mdi-react/ArrowLeftIcon";
import ArrowRightIcon from "mdi-react/ArrowRightIcon";

const Pagination = (props) => {

  const { currentPage, back, next, enabledNext, enabledBack } = props;

  return (
    <Container>
      <Left onClick={enabledBack ? () => back() : () => {}}><ArrowLeftIcon /></Left>
      <Center>{currentPage}</Center>
      <Right onClick={enabledNext ? () => next() : () => {}}><ArrowRightIcon /></Right>
    </Container>
  );
};

export default Connect(Pagination);

const Left = Styled.div`
  align-items: center;
`;

const Center = Styled.div`
  align-items: center;
`;

const Right = Styled.div`
  align-items: center;
`;

const Container = Styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
