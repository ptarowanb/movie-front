import MovieCard from '@/components/MovieCard';
import { Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import play_ic from '@/assets/icons/ic_play.svg';
import useBreakpoint from '@/hook/useBreakpoint';
import BaseSwiper from '@/components/BaseSwiper';
import { MovieType } from '@/models';

interface NewsFilmProps {
  movies: MovieType[];
  title?: string; // 동적으로 타이틀 설정 (기본값: "최신드라마")
}

const NewsFilm: React.FC<NewsFilmProps> = ({ movies, title = '최신드라마' }) => {
  const screenSize = useBreakpoint();

  return (
    <>
      {screenSize === 'desktop' ? (
        <>
          <div className='relative mb-4'>
            <div className='flex items-center gap-4'>
              <div className='relative w-7 h-7'>
                <Image src={play_ic} alt='play_ic' fill />
              </div>
              <Typography variant='h4' className='font-semibold text-2xl text-[white]'>
                {title}
              </Typography>
            </div>
            <div
              style={{
                border: '1px solid',
                borderImageSource: 'linear-gradient(90deg, #FFBB00 0%, black 100%)',
                borderImageSlice: 1,
                width: '70%',
                position: 'absolute',
                bottom: '-12px',
              }}
            ></div>
          </div>
          <div className='grid grid-cols-12 gap-4'>
            {movies.length > 0 ? (
              movies.map((movie) => (
                <div className='col-span-12 xl:col-span-2 md:col-span-4 sm:col-span-6' key={movie.id}>
                  <MovieCard movie={movie} />
                </div>
              ))
            ) : (
              <Typography className='col-span-12 text-center text-white'>영화가 없습니다.</Typography>
            )}
          </div>
        </>
      ) : (
        <>
          <div className='relative mb-8'>
            <div className='flex items-center gap-4'>
              <div className='relative w-7 h-7'>
                <Image src={play_ic} alt='play_ic' fill />
              </div>
              <Typography variant='h4' className='font-semibold text-2xl text-[white]'>
                {title}
              </Typography>
            </div>
            <div
              style={{
                border: '1px solid',
                borderImageSource: 'linear-gradient(90deg, #FFBB00 0%, black 100%)',
                borderImageSlice: 1,
                width: '70%',
                position: 'absolute',
                bottom: '-12px',
              }}
            ></div>
          </div>
          {movies.length > 0 ? (
            <BaseSwiper moviesByCategory={movies} />
          ) : (
            <Typography className='text-center text-white'>영화가 없습니다.</Typography>
          )}
        </>
      )}
    </>
  );
};

export default NewsFilm;
