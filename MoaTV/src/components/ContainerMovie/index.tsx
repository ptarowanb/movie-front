"use client";

import { MovieType } from '@/models';
import React from 'react';
import MovieCard from '../MovieCard';
import CustomSkeleton from '../Skeleton';
import { useRouter } from 'next/navigation';
import BaseSwiper from '../BaseSwiper';
import useBreakpoint from '@/hook/useBreakpoint';
import { getGenreByName } from '@/utils/utils';
import { usePage } from '../ContextPage'; 

interface ContainerMovieProps {
  category: string;
  moviesByCategory: { [key: string]: MovieType[] };
}

const ContainerMovie: React.FC<ContainerMovieProps> = ({ category, moviesByCategory }) => {
  const router = useRouter();
  const screenSize = useBreakpoint();
  const { setCurrentPage } = usePage(); 

  const movies = moviesByCategory[category] || [];

  const handleMoreClick = () => {
    const categoryId = getGenreByName(category)?.id;
    if (categoryId) {
      setCurrentPage(categoryId);
      router.push(`/category/${categoryId}`);
    }
  };

  return (
    <div className="w-full block">
      {movies.length > 0 ? (
        <>
          {screenSize === "desktop" ? (
            <div className="grid grid-cols-12 gap-3 w-full">
              {movies.slice(0, 6).map((movie: MovieType, index: number) => (
                <div className="col-span-12 xl:col-span-2 md:col-span-4 sm:col-span-6" key={movie.id || index}>
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          ) : (
            <BaseSwiper moviesByCategory={movies} />
          )}
        </>
      ) : (
        <CustomSkeleton />
      )}

      <div onClick={handleMoreClick} className="flex justify-end w-full cursor-pointer col-span-full mt-4">
        <div
          style={{ background: "linear-gradient(90deg, black 0%, #FFBB00 100%)" }}
          className="flex justify-end xl:w-[50%] md:w-[60%] w-full h-8 items-center rounded-tr-2xl rounded-br-2xl pr-4"
        >
          + 더보기
        </div>
      </div>
    </div>
  );
};

export default ContainerMovie;
