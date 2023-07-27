import React, { createContext, useContext, useState } from "react";
import { useQuery, gql } from "@apollo/client";

const GET_ANIME_LIST = gql`
  query GetAnimeList($page: Int, $perPage: Int) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
      }
      media(type: ANIME) {
        id
        title {
          romaji
        }
        coverImage {
          large
        }
        genres
        averageScore
      }
    }
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
}

interface AnimeContextValue {
  loading: boolean;
  error: any;
  animeList: Anime[];
  total: number;
  perPage: number;
  lastPage: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const AnimeContext = createContext<AnimeContextValue | undefined>(undefined);

export const useAnimeContext = () => {
  const context = useContext(AnimeContext);
  if (!context) {
    throw new Error("useAnimeContext must be used within AnimeProvider");
  }
  return context;
};

export const AnimeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, data } = useQuery(GET_ANIME_LIST, {
    variables: { page: currentPage, perPage: 10 },
  });

  const animeList = data?.Page?.media || [];
  const { total, perPage, lastPage } = data?.Page?.pageInfo || {};

  return (
    <AnimeContext.Provider
      value={{
        loading,
        error,
        animeList,
        total,
        perPage,
        lastPage,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </AnimeContext.Provider>
  );
};

export {};
