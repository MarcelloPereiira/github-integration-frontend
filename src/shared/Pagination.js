import React from "react";
import Styled from "styled-components";
import Connect from "../store/config/connect";
import ArrowLeftIcon from "mdi-react/ArrowLeftIcon";
import ArrowRightIcon from "mdi-react/ArrowRightIcon";

export const MAX_PAGINATION = 15;

const Pagination = (props) => {
  const { currentPage, back, next, enabledNext, enabledBack } = props;

  return (
    <Container>
      <div onClick={enabledBack ? () => back() : () => {}}>
        <ArrowLeftIcon cursor="pointer" color={enabledBack ? "#000" : "#ccc"} />
      </div>
      <div>{currentPage}</div>
      <div onClick={enabledNext ? () => next() : () => {}}>
        <ArrowRightIcon
          cursor="pointer"
          color={enabledNext ? "#000" : "#ccc"}
        />
      </div>
    </Container>
  );
};

export default Connect(Pagination);

const Container = Styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
