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
    height: 350px;
    margin-top: 78px;
  }
`;

const AnimeContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AnimeTextContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: justify;
  @media (min-width: 1000px) {
    margin-top: 10px;
  }
`;

const ImagePoster = styled.img`
  width: 30%;
  height: 50%;
  margin: 20px 20px 25px 15px;
  @media (min-width: 1000px) {
    width: 15%;
    height: 47%;
    margin: 35px 30px 25px 105px;
  }
`;

const AnimeDescription = styled.p`
  font-size: 10px;
  margin-top: -4px;
  @media (min-width: 1000px) {
    font-size: 13px;
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

  const renderHTMLDescription = (htmlString: string) => {
    return { __html: htmlString };
  };

  return (
    <>
      <Navbar />
      <BannerImageAnime src={animeId?.bannerImage} alt="banner_anime_image" />
      <AnimeContent>
        <ImagePoster src={animeId?.coverImage?.large} alt="anime_image" />
        <AnimeTextContent>
          <p>{animeId.title.romaji}</p>
          <AnimeDescription dangerouslySetInnerHTML={renderHTMLDescription(animeId?.description || "")}/>
        </AnimeTextContent>
      </AnimeContent>
    </>
  );
};

export default Detail;
