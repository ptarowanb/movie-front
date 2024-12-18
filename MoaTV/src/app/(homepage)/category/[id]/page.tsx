"use client";

import MovieCard from "@/components/MovieCard";
import NotFound from "@/components/NotFound";
import Pagination from "@/components/Pagination";
import CustomSkeleton from "@/components/Skeleton";
import { MovieType } from "@/models";
import { movieCategoriesDetails, PageInfoType } from "@/models/movie";
import { useGetMoviesQuery } from "@/services/movieService";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import play_ic from "@/assets/icons/ic_play.svg";
import Image from "next/image";

const Category = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetMoviesQuery({ category: Number(id), page, limit: 30 });
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [pageInfo, setPageInfo] = useState<PageInfoType>();

  useEffect(() => {
    if (data && data.success) {
      setMovies(data.data.movies);
      setPageInfo({
        current_page: data.data.page,
        last_page: Math.ceil(data.data.total / data.data.limit),
        per_page: data.data.limit,
        total: data.data.total,
      });
    }
  }, [data]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div>
      <div className="relative my-8">
        <div className="flex items-center gap-4">
          <div className="relative w-7 h-7">
            <Image src={play_ic} alt="play_ic" fill />
          </div>
          <Typography variant="h4" className="font-semibold text-2xl text-white">
            {movieCategoriesDetails[id as unknown as keyof typeof movieCategoriesDetails]?.title || "카테고리"}
          </Typography>
        </div>
        <div
          style={{
            border: "1px solid",
            borderImageSource: "linear-gradient(90deg, #5176FF 0%, #1C232C 100%)",
            borderImageSlice: 1,
            width: "70%",
            position: "absolute",
            bottom: "-12px",
          }}
        ></div>
      </div>

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
        {isLoading ? (
          Array.from({ length: 12 }).map((_, index) => (
            <div className="grid-item" key={index}>
              <CustomSkeleton />
            </div>
          ))
        ) : error ? (
          <div className="text-red-500">Error loading movies: {error.toString()}</div>
        ) : movies.length > 0 ? (
          movies.map((movie: MovieType) => (
            <div className="grid-item" key={movie.id}>
              <MovieCard movie={movie} />
            </div>
          ))
        ) : (
          <NotFound />
        )}
      </Box>

      {!!pageInfo && (
        <Pagination
          currentPage={pageInfo.current_page ?? 1}
          totalPages={pageInfo.last_page ?? 1}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Category;