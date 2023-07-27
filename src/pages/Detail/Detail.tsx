import React from "react";
import { useParams } from "react-router-dom";

const Detail: React.FC = () => {
  let { id } = useParams();
  return (
    <>
      <h1>Detail : {id}</h1>
    </>
  );
};

export default Detail;
