import React from "react";
import styled from "@emotion/styled";
import AnimeImage from "../../components/AnimeImage";
import Navbar from "../../components/Navbar";
import ReactPaginate from "react-paginate";
import LoadingPage from "../../components/LoadingPage";
import { useNavigate } from "react-router-dom";
import { useAnimeContext } from "../../hooks/Anime/useAnimeContext";

const AnimeListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: center;
  padding: 5px;
  @media (min-width: 1000px) {
    display: grid;
    grid-template-columns: repeat(5, 3fr);
  }
`;

const AnimeCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  max-width: 150px;
  max-height: 150px;
  margin: 13px;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (min-width: 1000px) {
    max-width: 240px;
    max-height: 320px;
    margin: 20px 50px;
  }
`;

const AnimeHeadTitle = styled.p`
  font-family: "Roboto", sans-serif;
  font-size: 25px;
  text-align: start;
  color: #A9A9A9;
  font-weight: bolder;
  margin: 5px 20px;


  @media (min-width: 1000px) {
    margin: 20px 65px;
    font-size: 32px;
  }
`;

const AnimeTitle = styled.div`
  font-size: 8px;
  font-weight: bold;
  height: 25px;
  @media (min-width: 1000px) {
    font-size: 15px;
    height: 40px;
  }
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
  @media (min-width: 1000px) {
    max-height: 70px;
  }
`;

const AnimeStar = styled.div`
  font-size: 6px;
  font-weight: bold;
  @media (min-width: 1000px) {
    font-size: 15px;
  }
`;

const ContainerStar = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3px;
  @media (min-width: 1000px) {
    display: flex;
    justify-content: start;
    align-items: center;
  }
`;

const HomeContainer = styled.div`
  margin-top: 80px;
  @media (min-width: 1000px) {
    margin-top: 150px;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  .pagination {
    display: flex;
    list-style: none;
    padding: 0;
    li {
      margin: 0 5px;
      a {
        color: #333;
        text-decoration: none;
        padding: 8px 12px;
        border-radius: 4px;
        &:hover {
          background-color: #f0f0f0;
        }
      }
      &.active {
        a {
          background-color: #333;
          color: #fff;
        }
      }
    }
  }
`;

const Home: React.FC = () => {
    const navigate = useNavigate();
    const {
        loading,
        error,
        animeList,
        total,
        perPage,
        lastPage,
        currentPage,
        setCurrentPage,
      } = useAnimeContext();
  
  if (loading) return <LoadingPage />;
  if (error) return <p>Error: {error.message}</p>;

  const toDetail = (id: Number) => {
    navigate(`/detail/${id}`);
  };

  const handlePageChange = (selectedPage: { selected: number }) => {
    const selectedPageNumber = selectedPage.selected + 1;
    setCurrentPage(selectedPageNumber);
  };

  return (
    <React.Fragment>
      <Navbar />
      <HomeContainer>
        <AnimeHeadTitle>Anime List</AnimeHeadTitle>
        <AnimeListContainer>
          {animeList.map((anime) => (
            <AnimeCard key={anime.id}  onClick={() => toDetail(anime.id)}>
              <AnimeImage src={anime.coverImage?.large} alt="" />
              <AnimeText>
                <AnimeTitle>{anime.title.romaji}</AnimeTitle>
                <ContainerStar>
                  <AnimeStar>⭐️ {anime.averageScore / 20}</AnimeStar>
                </ContainerStar>
              </AnimeText>
            </AnimeCard>
          ))}
        </AnimeListContainer>
      </HomeContainer>
      <PaginationContainer>
        <ReactPaginate
          pageCount={lastPage || 1}
          onPageChange={handlePageChange}
          forcePage={currentPage - 1}
          marginPagesDisplayed={0}
          pageRangeDisplayed={2}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </PaginationContainer>
    </React.Fragment>
  );
};

export default Home;
