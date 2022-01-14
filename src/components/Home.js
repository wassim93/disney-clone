import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setMovies } from "../features/movie/movieSlice";
import ImgSlider from "./ImgSlider";
import Movies from "./Movies";
import Viewers from "./Viewers";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("https://api.npoint.io/8f00f397374785e70e1c")
      .then((res) => {
        //console.log("res", res.data.movies);
        dispatch(setMovies(res.data.movies));
      })
      .catch((err) => console.log("err", err));
  }, []);
  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Movies />
    </Container>
  );
};

export default Home;

const Container = styled.main`
  min-height: calc(100vh - 70px);
  padding: 0 calc(3.5vw + 5px);
  position: relative;
  overflow-x: hidden;
  overflow-y: hidden;

  &:before {
    content: "";
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
  }
`;
