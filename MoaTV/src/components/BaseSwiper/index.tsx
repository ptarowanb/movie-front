import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MovieType } from '@/models';
import CustomSkeleton from '../Skeleton';
import MovieCard from '../MovieCard';
const BaseSwiper = ({ moviesByCategory }: {
    moviesByCategory: MovieType[];
}) => {

    return (
        <Swiper
            className='mx-1'
            spaceBetween={12}
            breakpoints={{
                500: {
                    slidesPerView: 4,
                },
                0: {
                    slidesPerView: 3,
                },
            }}

        >

            <div>
                {!!moviesByCategory && moviesByCategory.length > 0 ? (
                    moviesByCategory.map((movie: MovieType, index: number) => (
                        <SwiperSlide className="col-span-12 xl:col-span-3 md:col-span-4 sm:col-span-6" key={index}>
                            <MovieCard movie={movie} />
                        </SwiperSlide>
                    ))
                ) : (
                    Array.from({ length: 2 }).map((_, index) => (
                        <SwiperSlide className="col-span-12 xl:col-span-3 md:col-span-4 sm:col-span-6" key={index}>
                            <CustomSkeleton />
                        </SwiperSlide>
                    ))
                )}
            </div>

        </Swiper>
    );
};

export default BaseSwiper;