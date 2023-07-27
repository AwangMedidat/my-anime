import React from "react";
import styled from "@emotion/styled";

type AnimeGenresProps = {
  genres: string[];
};

const GenreContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const GenreContainerItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 5px;
`;

const GenreList = styled.span`
  font-size: 5px;
  font-weight: bold;
  color: #333;
  max-width: 30px;
`;

const AnimeGenres: React.FC<AnimeGenresProps> = ({ genres }) => {
  return (
    <GenreContainer>
      <GenreList>Genres:</GenreList>
      <GenreContainerItem>
        {genres.map((genre) => genre).join(", ")}
      </GenreContainerItem>
    </GenreContainer>
  );
};

export default AnimeGenres;
