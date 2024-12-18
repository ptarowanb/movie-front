"use client";

import React, { useEffect, useState } from "react";
import { useGetMoviesQuery, useGetMovieDetailsQuery } from "@/services/movieService";
import MoviePlayer from "@/components/MoviePlayer";
import PresentationMovie from "@/components/PresentationMovie";
import NewsFilm from "@/components/ContainerMovie/NewsFilm";
import CustomSkeleton from "@/components/Skeleton";
import { MovieType, EpisodeType } from "@/models";
import { useRouter } from "next/navigation";

const Details = ({ params }: { params: { movieId: string; ep_no: string } }) => {
  const router = useRouter();
  const { movieId, ep_no } = params;

  const [currentEp, setCurrentEp] = useState<number>(Number(ep_no));
  const [newMovies, setNewMovies] = useState<MovieType[]>([]);

  const { data: movieDetail, isLoading, error } = useGetMovieDetailsQuery({
    movieId,
    ep_no: currentEp,
  });

  const { data: newMoviesData, isSuccess: isNewMoviesSuccess } = useGetMoviesQuery({ page: 1, limit: 6 });

  useEffect(() => {
    if (isNewMoviesSuccess && newMoviesData?.data) {
      setNewMovies(newMoviesData.data);
    }
  }, [isNewMoviesSuccess, newMoviesData]);

  useEffect(() => {
    if (currentEp && currentEp !== Number(ep_no)) {
      router.push(`/detail/${movieId}/${currentEp}`);
    }
  }, [currentEp, movieId, router, ep_no]);

  const episodes = movieDetail?.data?.data?.episodes || [];
  const currentEpisode: EpisodeType | undefined = episodes.find((ep: EpisodeType) => ep.ep_no === currentEp);

  const videoUrl = currentEpisode?.video_url || movieDetail?.data?.data?.video_url || "";
  console.log(movieDetail);
  return (
    <>
      <title>{movieDetail?.data?.data?.title ? `${movieDetail.data.data.title} 다시보기` : "Loading..."}</title>
      <div className="bg-[black] min-h-screen">
        {isLoading ? (
          <CustomSkeleton />
        ) : error ? (
          <div className="text-center text-red-500">Error fetching movie details.</div>
        ) : movieDetail?.data?.data ? (
          <>
            <MoviePlayer movieUrl={videoUrl} />
            <PresentationMovie
              profile={movieDetail.data.data}
              plays={{ total: episodes.length || 1, data: episodes }}
              changeEp={setCurrentEp}
            />
          </>
        ) : (
          <div className="text-center text-white">Movie Not Found</div>
        )}
        <div className="mt-5">
          <NewsFilm movies={newMovies} />
        </div>
      </div>
    </>
  );
};

export default Details;
