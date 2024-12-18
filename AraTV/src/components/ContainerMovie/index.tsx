"use client"
import { MovieType } from '@/models';
import React, { useEffect, useState } from 'react';
import MovieCard from '../MovieCard';
import CustomSkeleton from '../Skeleton';
import { useRouter } from 'next/navigation';
import TopMovieComponent from '../TopMovieComponent';
import './TopFilm.css'
import { useGetMoviesQuery } from '@/services/movieService';
import { getGenreByName } from '@/utils/utils';
interface IRankMovies {
    id: number,
    image: string,
    title: string,
    des: string,
    new: number,
    number_ep: string,
    title_id: number
}

interface IRankMoviesCustom {
    id: number,
    img: string,
    title: string,
    des: string,
    isNew: boolean,
    number_ep: string,
    title_id: number
}

const ContainerMovie = ({ category, moviesByCategory }: {
    category: string, moviesByCategory: {
        [key: string]: MovieType[];
    }
}) => {

    const router = useRouter()
    const [loading, setIsLoading] = useState<boolean>(true)
    const [rankMovies, setRankMovies] = useState([])
    const getRankMovies = useGetMoviesQuery({ limit: 10, page: 1 })

    useEffect(() => {
        setIsLoading(true);
        try {
            if (getRankMovies.status === "fulfilled") {
                const customRankMovies = getRankMovies.data?.data?.map((rank: IRankMovies) => (
                    {
                        id: rank.id,
                        img: rank.image,
                        title: rank.title,
                        des: rank.des,
                        number_ep: rank.number_ep,
                        isNew: rank.new === 1 ? true : false,
                        title_id: rank.title_id
                    }
                ))
                setRankMovies(customRankMovies)
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
        }
    }, [getRankMovies])

    return (
        <div className={`w-full block`}>

            <div className={`grid grid-cols-12 gap-3 w-full`}>
                {!!moviesByCategory[category] && moviesByCategory[category].length > 0 && (
                    moviesByCategory[category].slice(0,6).map((movie: MovieType, index: number) => (
                        <div className="col-span-12 xl:col-span-2 md:col-span-4 sm:col-span-6" key={index}>
                            <MovieCard movie={movie} />
                        </div>
                    ))
                )}
                <div onClick={() => router.push(`/category/${getGenreByName(category)?.id}`)} className='flex justify-end w-full cursor-pointer col-span-full'>
                    <div style={{
                        background: "linear-gradient(90deg, #1C232C 0%, #425DC0 100%)",

                    }} className='flex justify-end xl:w-[50%] md:w-[60%] w-full h-8 items-center rounded-tr-2xl rounded-br-2xl pr-4'>+ 더보기</div>
                </div>
            </div>
            {/* {
                category === 'k-drama' &&
                <div
                    className='pt-2 flex-1 pb-10 rounded-2xl h-[613px] px-2 max-w-[400px]'
                    style={{
                        background: 'linear-gradient(270deg, #262E39 0%, #12171E 100%)'

                    }}>
                    <div className='flex h-[550px] flex-col flex-1 gap-5 overflow-y-scroll scrollbar' id='style-14'>
                        {
                            loading ? (
                                <>
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <CustomSkeleton key={index} height='100px' />
                                    ))}
                                </>
                            ) : <>
                                {
                                    rankMovies?.map((topFilm: IRankMoviesCustom) => {
                                        return (
                                            <TopMovieComponent key={topFilm.id} title_id={topFilm.title_id} number_ep={topFilm.number_ep} img={topFilm.img} title={topFilm.title} des={topFilm.des} isNew={topFilm.isNew} />
                                        )
                                    })
                                }
                            </>
                        }
                    </div>
                </div>
            } */}
        </div>
    );
};

export default ContainerMovie;