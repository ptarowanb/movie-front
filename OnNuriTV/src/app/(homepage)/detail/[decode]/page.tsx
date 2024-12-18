"use client";
import {
  useGetEpisodesMutation,
  useGetMovieDetailsMutation,
  useGetMoviesQuery,
} from "@/services/movieService";
import { decodeData, encodeData } from "@/utils/utils";
import { useEffect, useState } from "react";
import "video.js/dist/video-js.css";
import PresentationMovie from "@/components/PresentationMovie";
import NewsFilm from "@/components/ContainerMovie/NewsFilm";
import { ProfilesType } from "@/models/movie";
import MoviePlayer from "@/components/MoviePlayer";
import { useRouter } from "next/navigation";
import { MovieType } from "@/models";

const Details = ({ params }: { params: { decode: string } }) => {
  const router = useRouter();

  const { decode } = params;
  const getNewMovies = useGetMoviesQuery({ page: 1, limit: 6 });
  const [getMovieDetail] = useGetMovieDetailsMutation({});
  const [getAllEpisodes] = useGetEpisodesMutation({});

  const [movieDetail, setMovieDetail] = useState<ProfilesType>();
  const [currentEp, setCurrentEp] = useState<number>();
  const [newMovies, setNewMovies] = useState<MovieType[]>([]);
  const [totalEps, setTotalEps] = useState<{
    total: number;
    data: { id: number; title_id: number; number_ep: string }[];
  }>({ total: 0, data: [] });
  const [bunnyUrl, setBunnyUrl] = useState<string>("");
  const [decodedInfo, setDecodedInfo] = useState<{
    id: number;
    title: string;
    number_ep: number | null;

  }>();

  useEffect(() => {
    if (getNewMovies.status === "fulfilled") {
      setNewMovies(getNewMovies.data.data);
    }
  }, [getNewMovies]);
  useEffect(() => {
    const getDetails = async (decode: string) => {
      const decoded = decodeData(decode);
      setDecodedInfo(decoded);
      const allEpisodes = await getAllEpisodes({ id: decoded.id });
      setTotalEps({
        total: allEpisodes.data.data.length,
        data: allEpisodes.data.data,
      });
      const details = await getMovieDetail({
        id: decoded.id,
        title: decoded.title,
        number_ep: decoded.number_ep,
      });
      if (details) {
        if (details.data) {
          setMovieDetail(details.data.data);
          setBunnyUrl(details.data.data.bunny_url);
        } else {
          setMovieDetail(undefined);
        }
      }
    };
    if (decode) {
      getDetails(decode);
    }
  }, [decode, getMovieDetail, getAllEpisodes]);
  useEffect(() => {
    if (currentEp && decodedInfo) {
      decodedInfo.number_ep = currentEp;
      const toEncode = encodeData(decodedInfo);
      router.push(`/detail/${toEncode}`);
    }
  }, [currentEp, router, decodedInfo]);

  return (
    <>
      <title>{movieDetail?.title ? `${movieDetail.title} 다시보기` : 'Loading...'}</title>
      <div className="bg-[black]">
        {movieDetail ? (
          <>
            <MoviePlayer movieUrl={bunnyUrl} />
            <PresentationMovie
              profile={movieDetail}
              plays={totalEps}
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