import { signOut, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  selectUser,
  setSignOut,
  setUserLogin,
} from "../features/user/userSlice";
import { auth, provider } from "../firebase";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  //console.log(user);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        //console.log("user", user);
        dispatch(setUserLogin(user));
        navigate("/");
      }
    });
  }, []);

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        //console.log(res);
        dispatch(setUserLogin(res.user));
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const signOutUser = () => {
    signOut(auth)
      .then((res) => {
        //console.log(res);
        dispatch(setSignOut());
        navigate("/login", { replace: true });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Nav>
      <Logo src="/images/logo.svg" />
      {user === undefined || Object.entries(user).length === 0 ? (
        <LoginContainer onClick={signIn}>
          <LoginBtn>Login</LoginBtn>
        </LoginContainer>
      ) : (
        <>
          <NavMenu>
            <a>
              <img src="/images/home-icon.svg" />
              <span>HOME</span>
            </a>
            <a>
              <img src="/images/search-icon.svg" />
              <span>SEARCH</span>
            </a>
            <a>
              <img src="/images/watchlist-icon.svg" />
              <span>WATCHLIST</span>
            </a>
            <a>
              <img src="/images/original-icon.svg" />
              <span>ORIGINALS</span>
            </a>
            <a>
              <img src="/images/movie-icon.svg" />
              <span>MOVIES</span>
            </a>
            <a>
              <img src="/images/series-icon.svg" />
              <span>SERIES</span>
            </a>
          </NavMenu>
          <UserImg onClick={signOutUser} src={user.photoURL} />
        </>
      )}
    </Nav>
  );
};

export default Header;

const Nav = styled.nav`
  height: 70px;
  background-color: #090b13;
  display: flex;
  padding: 0 30px;
  align-items: center;
  overflow-x: hidden;
`;

const Logo = styled.img`
  width: 80px;
`;

const NavMenu = styled.div`
  display: flex;
  flex: 1;
  margin-left: 25px;
  align-items: center;
  a {
    display: flex;
    align-items: center;
    padding: 0 12px;
    cursor: pointer;
    img {
      height: 20px;
    }
    span {
      font-size: 13px;
      letter-spacing: 1.42px;
      position: relative;
      &:after {
        content: "";
        height: 2px;
        background: white;
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        opacity: 0;
        transform-origin: left center;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        transform: scaleX(0);
      }
    }

    &:hover {
      span:after {
        transform: scaleX(1);
        opacity: 1;
      }
    }
  }
`;

const UserImg = styled.img`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  cursor: pointer;
  align-items: center;
`;

const LoginBtn = styled.div`
  padding: 8px 16px;
  border-radius: 4px;
  color: rgb(249, 249, 249);
  background-color: rgba(0, 0, 0, 0.6);
  border: 1px solid #f9f9f9;
  cursor: pointer;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const LoginContainer = styled.div`
  flex: 1;
  justify-content: flex-end;
  display: flex;
`;
