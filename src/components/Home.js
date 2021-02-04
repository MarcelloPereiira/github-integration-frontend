import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Styled from "styled-components";
import Card from "../shared/Card";
import Header from "../shared/Header";
import Connect from "../store/config/connect";
import ReactLoading from "react-loading";
import Pagination from "../shared/Pagination";

const Home = (props) => {
  const { isLoggedIn, proxy_url } = props.auth;
  const { dispatch } = props;
  const { users, loading } = props.users;

  const [currentPage, setCurrentPage] = useState(1);

  // useEffect(() => {
  //   handleGetUsers();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useEffect(() => {
    dispatch({ type: "FETCH_USERS" });
    return fetch(`${proxy_url}/users?since=${(currentPage-1)*10}&per_page=10`)
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
            {loading && (
              <ReactLoading color="blue" type="spin" height={60} width={60} />
            )}
            {users && users.message && <p>API rate limit exceeded.</p>}
            {users &&
              !users.message &&
              users.map((user, index) => (
                <Card
                  key={index}
                  id={user.id}
                  avatar_url={user.avatar_url}
                  login={user.login}
                  onClick={() => props.history.push(`/user/${user.id}/repos`)}
                />
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
