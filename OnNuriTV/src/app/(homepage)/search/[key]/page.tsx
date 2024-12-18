"use client";

import MovieCard from "@/components/MovieCard";
import NotFound from "@/components/NotFound";
import Pagination from "@/components/Pagination";
import CustomSkeleton from "@/components/Skeleton";
import { MovieType } from "@/models";

import { PageInfoType } from "@/models/movie";

import { useSearchMoviesQuery } from "@/services/movieService";
import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Search = () => {
  const params = useParams();
  const { key } = params as { key: string };

  const [movies, setMovies] = useState<MovieType[]>([]);
  const [page, setPage] = useState<number>();
  const [loading, setIsLoading] = useState<boolean>(true);
  const [pageInfo, setPageInfo] = useState<PageInfoType>();
  const { data } = useSearchMoviesQuery({ search: key, page, limit: 30 });

  useEffect(() => {
    setIsLoading(true);
    try {
      if (data) {
        setIsLoading(false);
        const { current_page, last_page, per_page, total } = data;
        setPageInfo({ current_page, last_page, per_page, total });
        setMovies(data.data);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, [data]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  console.log("movies", movies);


  return (
    <div>
      <h1 className="pb-2 text-xl font-bold transition-transform duration-300 hover:scale-105">
        Search
      </h1>

      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "repeat(2, 1fr)",
          sm: "repeat(3, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(6, 1fr)",
        }}
        gap={2}
      >
        {loading ? (
          Array.from({ length: 12 }).map((_, index) => (
            <div className="grid-item" key={index}>
              <CustomSkeleton />
            </div>
          ))
        ) : (
          <>
            {movies?.length > 0 ? (
              <>
                {movies?.map((movie: MovieType, index: number) => (
                  <div className="grid-item" key={index}>
                    <MovieCard movie={movie} />
                  </div>
                ))}
              </>
            ) : (
              <>
                <NotFound />
              </>
            )}
          </>
        )}
      </Box>
      {pageInfo && (
        <Pagination
          currentPage={pageInfo.current_page ?? 1}
          totalPages={pageInfo.last_page ?? 1}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Search;
