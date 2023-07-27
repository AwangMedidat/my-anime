import React from "react";
import { useQuery, gql } from "@apollo/client";
import styled from "@emotion/styled";
import AnimeImage from "./components/AnimeImage";
import AnimeGenres from "./components/AnimeGenres";
import Navbar from "./components/Navbar";

const GET_ANIME_LIST = gql`
  query {
    Page(page: 2, perPage: 10) {
      media(type: ANIME) {
        id
        title {
          romaji
        }
        coverImage {
          medium
          large
        }
        genres
        averageScore
      }
    }
  }
`;

const AnimeListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

const AnimeCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  max-width: 180px;
  max-height: 250px;
  margin: 13px;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const AnimeTitle = styled.div`
  font-size: 8px;
  font-weight: bold;
  // color: #333;
  height: 25px;
`;

const AnimeText = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 6px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color: white;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 0 0 10px 10px;
  max-height: 30px;
`;

const AnimeStar = styled.div`
  font-size: 6px;
  font-weight: bold;
  // color: #333;
`;

const ContainerStar = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3px;
`;

interface Anime {
  id: number;
  title: {
    romaji: string;
  };
  coverImage: {
    medium: string;
    large: string;
  };
  genres: string[];
  averageScore: number;
}

const App: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ANIME_LIST);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const animeList = data?.Page?.media || [];

  return (
    <>
      <Navbar />
      <AnimeListContainer>
        {animeList.map((anime: Anime) => (
          <AnimeCard key={anime.id}>
            <AnimeImage src={anime.coverImage?.large} alt="" />
            <AnimeText>
              <AnimeTitle>{anime.title.romaji}</AnimeTitle>
              {/* <AnimeGenres genres={anime.genres} /> */}
              <ContainerStar>
                <AnimeStar>⭐️ {anime.averageScore / 20}</AnimeStar>
              </ContainerStar>
            </AnimeText>
          </AnimeCard>
        ))}
      </AnimeListContainer>
    </>
  );
};

export default App;
