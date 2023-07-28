import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import LoadingPage from "../../components/LoadingPage";
import styled from "@emotion/styled";
import Navbar from "../../components/Navbar";

const GET_ANIME_ID = gql`
  query GetAnimeID($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      title {
        romaji
      }
      coverImage {
        large
      }
      genres
      description
      averageScore
      bannerImage
    }
  }
`;

const BannerImageAnime = styled.img`
  width: 100%;
  height: 130px;
  position: relative;
  margin-top: 52px;
  @media (min-width: 1000px) {
    height: 400px;
    margin-top: 108px;
  }
`;

const ImagePoster = styled.img`
  width: 20%;
  height: 30%;
  position: absolute;
  margin: 230px 40px;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 999;
  @media (min-width: 1000px) {
    width: 15%;
  height: 47%;
  margin: 110px 150px;
  }
`;

interface Anime {
  id: number;
  title: {
    romaji: string;
  };
  coverImage: {
    large: string;
  };
  genres: string[];
  averageScore: number;
  description: string;
  bannerImage: string;
}

const Detail: React.FC = () => {
  let { id } = useParams();
  const { loading, error, data } = useQuery(GET_ANIME_ID, {
    variables: { id: id },
  });

  if (loading) return <LoadingPage />;
  if (error) return <p>Error: {error.message}</p>;

  const animeId: Anime = data?.Media || [];

  return (
    <>
      <Navbar />
      <BannerImageAnime src={animeId?.bannerImage} alt="banner_anime_image" />
      <ImagePoster src={animeId?.coverImage?.large} alt="anime_image" />
    </>
  );
};

export default Detail;
