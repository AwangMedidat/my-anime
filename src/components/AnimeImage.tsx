import React from "react";
import styled from "@emotion/styled";

type AnimeImageProps = {
  src: string | undefined;
  alt: string;
};

const StyledAnimeImage = styled.img`
  width: 100%;
  height: 150px;
  border-radius: 8px;
  @media (min-width: 1000px) {
    height: 320px;
  }
`;

const AnimeImage: React.FC<AnimeImageProps> = ({ src, alt }) => {
  return <StyledAnimeImage src={src} alt={alt} />;
};

export default AnimeImage;
