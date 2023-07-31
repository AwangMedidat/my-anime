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
  flex-direction: column;
  justify-content: space-between;
  //   align-items: center;
  @media (min-width: 1000px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const AnimeTextContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: justify;
  margin: 0 25px;
  padding: 10px;
  background-color: #fff;
  @media (min-width: 1000px) {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    background-color: #f3f4fd;
    margin: 0px;
    // padding-right: 100px;
    // padding-left: 100px;
  }
`;

const ImagePoster = styled.img`
  width: 30%;
  height: 50%;
  margin: 20px 20px 25px 25px;
  @media (min-width: 1000px) {
    width: 200px;
    height: 100%;
    margin: 35px 30px 25px 105px;
  }
`;

const AnimeDescription = styled.p`
  font-size: 10px;
  margin-top: -4px;
  @media (min-width: 1000px) {
    font-size: 13px;
    margin-top: 20px;
  }
`;

const AnimeImageText = styled.div`
  display: flex;
  flex-direction: row;
  @media (min-width: 1000px) {
    display: flex;
    flex-direction: column;
  }
`;

const AnimeTitle = styled.p`
  display: flex;
  flex-direction: row;
  @media (min-width: 1000px) {
    display: none;
  }
`;

const AnimeTitleSecond = styled.h4`
  display: none;
  @media (min-width: 1000px) {
    display: flex;
    margin: -10px 0px;
  }
`;
const Description = styled.p`
  margin: 6px 25px;
  font-family: "Roboto", sans-serif;
  font-size: 12px;
  color: #A9A9A9;
  font-weight: bolder;
  @media (min-width: 1000px) {
    display: none;
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
        <AnimeImageText>
          <ImagePoster src={animeId?.coverImage?.large} alt="anime_image" />
          <AnimeTitle>{animeId.title.romaji}</AnimeTitle>
        </AnimeImageText>
        <Description>Description</Description>
        <AnimeTextContent>
          <AnimeTitleSecond>{animeId.title.romaji}</AnimeTitleSecond>
          <AnimeDescription
            dangerouslySetInnerHTML={renderHTMLDescription(
              animeId?.description || ""
            )}
          />
        </AnimeTextContent>
        <p>Hat</p>
      </AnimeContent>
    </>
  );
};

export default Detail;
