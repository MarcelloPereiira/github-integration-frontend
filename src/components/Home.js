import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Styled from "styled-components";
import Card from "../shared/Card";
import Header from "../shared/Header";
import Connect from "../store/config/connect";
import ReactLoading from "react-loading";
import Pagination, { MAX_PAGINATION } from "../shared/Pagination";

const Home = (props) => {
  const { isLoggedIn, proxy_url } = props.auth;
  const { dispatch } = props;
  const { users, loading } = props.users;

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch({ type: "FETCH_USERS" });
    return fetch(
      `${proxy_url}/users?since=${
        (currentPage - 1) * MAX_PAGINATION
      }&per_page=${MAX_PAGINATION}`
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: "USERS",
          payload: { users: data },
        });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <Wrapper>
      <div className="container">
        <Header />
        <div>
          <div className="content">
            <h1 className="h1">Users</h1>
            {loading && (
              <div className="container-loading">
                <ReactLoading color="blue" type="spin" height={60} width={60} />
              </div>
            )}
            {users && users.message && <p>API rate limit exceeded.</p>}
            {!loading && users && !users.message && users.length === 0 && (
              <p>
                Please go back to the previous page, we have no more
                information.
              </p>
            )}
            {users &&
              !users.message &&
              users.map((user, index) => (
                <Card
                  key={index}
                  id={user.id}
                  onClick={() => props.history.push(`/users/${user.id}/repos`)}
                >
                  <img
                    src={user.avatar_url}
                    alt="Avatar"
                    style={{ width: 40, height: 40 }}
                  />
                  <P>{user.login}</P>
                </Card>
              ))}
            {!loading && users && !users.message && (
              <Pagination
                currentPage={currentPage}
                back={() => setCurrentPage(currentPage - 1)}
                next={() => setCurrentPage(currentPage + 1)}
                enabledBack={currentPage > 1}
                enabledNext={users && users.length}
              />
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Connect(Home);

const P = Styled.p`
  padding: 10px;
`;

const Wrapper = Styled.section`
.container{
  display: flex;
  flex-direction: column;
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
    text-decoration: none;

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

    .content{
      display: flex;
      flex-direction: column;
      padding: 20px 100px;  
      width: 100%;
      display: flex;
      align-items: center;

      h1 {
        margin-bottom: 20px
      }

      .container-loading {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: -100px;
      }
    }
  }
}
`;
