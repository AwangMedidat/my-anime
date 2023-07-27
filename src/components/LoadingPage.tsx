import React from "react";
import styled from "@emotion/styled";
import LoadingGif from "../assets/images/loading.gif";

const LoadingStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  //   background-color: rgba(0, 0, 0, 0.6);
  opacity: 0.2;
  z-index: 10;
`;

const ContainerLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 150px;
  @media (min-width: 1000px) {
    margin-top: 250px;
    font-size: 30px;
  }
`;

const LoadingPage: React.FC = () => {
  return (
    <LoadingStyle>
      <ContainerLoading>
        <img src={LoadingGif} alt="Loading" />
      </ContainerLoading>
    </LoadingStyle>
  );
};

export default LoadingPage;
