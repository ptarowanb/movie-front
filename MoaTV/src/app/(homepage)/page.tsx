"use client";

import { useGetAllCategoryMoviesQuery } from "@/services/movieService";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { MovieType } from "@/models";
import Image from "next/image";
import play_ic from "@/assets/icons/ic_play.svg";
import ContainerMovie from "@/components/ContainerMovie";
import CustomSkeleton from "@/components/Skeleton";

const HomePage = () => {
  const [cate, setCate] = useState<string[]>([]);
  const [movies, setMovies] = useState<{ [key: string]: MovieType[] }>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const categories = useGetAllCategoryMoviesQuery({ limit: 8 });

  useEffect(() => {
    try {
      if (categories.status === "pending") {
        setIsLoading(true);
      }
      if (categories && categories.data && categories.status === "fulfilled") {
        setCate(Object.keys(categories.data.data));
        setMovies(categories.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  }, [categories]);

  return (
    <>
      {isLoading ? (
        <div className="grid grid-cols-12 gap-3 my-6">
          {Array.from({ length: 24 }).map((_, index) => (
            <div className="col-span-12 xl:col-span-3 md:col-span-4 sm:col-span-6" key={index}>
              <CustomSkeleton />
            </div>
          ))}
        </div>
      ) : (
        <>
          {cate.map((category) => (
            <div key={category} className="mb-8">
              <div className="relative mb-8">
                <div className="flex items-center gap-4">
                  <div className="relative w-7 h-7">
                    <Image src={play_ic} alt="play_ic" fill />
                  </div>
                  <Typography variant="h4" className="font-semibold text-2xl text-[white]">
                    {category}
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

              <ContainerMovie category={category} moviesByCategory={movies} />
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default HomePage;