/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithoutToken } from './baseQuery';

export const MovieService = createApi({
  reducerPath: 'UserService',
  baseQuery: baseQueryWithoutToken,
  endpoints: (builder) => ({
    getMovies: builder.query<any, any>({
      query: ({category, page,limit}:{category: number, page: number,limit : string}) => ({
        url: `movies?${category ? `genre=${category}&` : ''}${page ? `page=${page}&` : ''}${limit ? `limit=${limit}` : ''}`,
        method: 'GET'
      })
    }),
    searchMovies: builder.query<any, any>({
      query: ({ page, search}:{ page: number, search: string}) => ({
        url: `movies/search?${page ? `page=${page}&` : ''}${search ? `search=${search}&` : ''}`,
        method: 'GET'
      })
    }),
    getMovieDetails: builder.query<any, { movieId: string; ep_no: number }>({
      query: ({ movieId, ep_no }) => ({
        url: `movie/${movieId}?ep_no=${ep_no}`,
        method: 'GET',
      }),
    }),
    getCategoryMovies: builder.query<any, any>({
      query: ({ limit, categoryGroup }: { limit: string; categoryGroup: string }) => ({
        url: `movie/categories?${limit ? `limit=${limit}&` : ''}${categoryGroup ? `categoryGroup=${categoryGroup}` : ''}`,
        method: 'GET',
      }),
    }),
    getAllCategoryMovies: builder.query<any, any>({
      query: ({ limit }) => ({
        url: `movie/categories/all?${limit ? `limit=${limit}` : ''}`,
        method: 'GET',
      }),
    }),
    getEpisodes: builder.mutation<any, any>({
      query: ({id}: {id: number}) => ({
        url: `movies/episodes?id=${id}`,
        method: 'GET'
      })
    })
  })
});

export const {
  useGetMoviesQuery,
  useSearchMoviesQuery,
  useGetCategoryMoviesQuery,
  useGetAllCategoryMoviesQuery,
  useGetMovieDetailsQuery,
  useGetEpisodesMutation
} = MovieService;
