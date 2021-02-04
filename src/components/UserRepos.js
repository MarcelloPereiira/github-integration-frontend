import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Styled from "styled-components";
import Card from "../shared/Card";
import Header from "../shared/Header";
import Connect from "../store/config/connect";
import ReactLoading from "react-loading";
import Pagination, { MAX_PAGINATION } from "../shared/Pagination";

const UserRepos = (props) => {
  const { isLoggedIn, proxy_url } = props.auth;
  const { dispatch } = props;
  const { userRepos, loading } = props.userRepos;
  const { id } = props.match.params;

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch({ type: "FETCH_USER_REPOS" });
    fetch(
      `${proxy_url}/user/${id}/repos?page=${currentPage}&per_page=${MAX_PAGINATION}`
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: "USER_REPOS",
          payload: { userRepos: data },
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
            <h1 className="h1">Repositories</h1>
            {loading && (
              <div className="container-loading">
                <ReactLoading color="blue" type="spin" height={60} width={60} />
              </div>
            )}
            {userRepos && userRepos.message && <p>API rate limit exceeded.</p>}
            {!loading &&
              userRepos &&
              !userRepos.message &&
              userRepos.map((userRepo, index) => (
                <Card key={index} id={userRepo.id}>
                  <div className="content-children">
                    <P>{userRepo.full_name}</P>
                    <P>
                      <span>Forks:{userRepo.forks_count}</span>
                    </P>
                  </div>
                </Card>
              ))}
            {!loading && userRepos && !userRepos.message && (
              <div className="content-pagination">
                <div className="left" />
                <Pagination
                  currentPage={currentPage}
                  back={() => setCurrentPage(currentPage - 1)}
                  next={() => setCurrentPage(currentPage + 1)}
                  enabledBack={currentPage > 1}
                  enabledNext={userRepos && userRepos.length}
                />
                <button onClick={() => props.history.push(`/`)}>Back</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Connect(UserRepos);

const P = Styled.p`
  padding: 10px;
  span {
      font-size: 12px;
      color: #777;
  }
`;

const Wrapper = Styled.section`
.container{
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: Arial;

  button {
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
    cursor: pointer !important;

    a {
        color: #fff;
        text-decoration: none;
    }

    &:hover{
      background-color: #fff;
      color: #0041C2;
      a {
        color: #0041C2;
      }
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

      .content-children {
          display: flex;
          justify-content: space-between;
          width: 100%;
      }

      .content-pagination {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 800px;
          width: 100%;

          .left {
              width: 100px;
          }
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
