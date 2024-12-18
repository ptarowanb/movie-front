import { ProfilesType } from "@/models/movie";
import React, { useEffect, useState } from "react";
import ContainerDetailMovie from "../ContainerDetailMovie";
import { Button, Tooltip } from "@mui/material";
import InformationMovie from "../InformationMovie";
import "./presentation-movie.css";
import { useGetBannersQuery } from "@/services/bannerService";
import { BannerType } from "@/models/ad";
import BannerMovies from "../BannerMovies";

const PresentationMovie = ({
  profile,
  plays,
  changeEp,
}: {
  profile: ProfilesType;
  plays: {
    total: number;
    data: { id: number; title_id: number; number_ep: string }[];
  };
  changeEp: (number: number) => void;
}) => {
  const { data: getBanners } = useGetBannersQuery({});
  const [banners, setBanners] = useState<BannerType[]>([]);
  useEffect(() => {
    if (getBanners) setBanners(getBanners.data);
  }, [getBanners]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <ContainerDetailMovie>
          <div className="flex items-center gap-5 px-4">
            <span className="text-lg font-semibold xl:text-2xl">서버:</span>
            <div className="flex items-center gap-1">
              <Button
                sx={{
                  background: "#FFBB00",
                  borderRadius: "11px",
                  width: { xs: "106px", sm: "124px" },
                  height: "40px",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                서버 1
              </Button>
            </div>
          </div>
        </ContainerDetailMovie>
        <ContainerDetailMovie>
          <div className="flex flex-col px-4 gap-7 xl:gap-8">
            <span className="text-lg font-semibold leading-7 xl:text-2xl">
              영화 목록
            </span>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              {plays.data.map((episode, index) => {
                return (
                  <Tooltip
                    key={index}
                    title={episode.number_ep}
                    onClick={() => changeEp(parseInt(episode.number_ep))}
                  >
                    <div
                      className={`bg-[#263750] ${profile.number_ep === episode.number_ep
                        ? "bg-[#FFBB00]"
                        : ""
                        } flex justify-center items-center text-center text-white font-semibold text-base leading-5  xl:w-[120px] px-4 h-10 rounded cursor-pointer overflow-hidden whitespace-nowrap`}
                    >
                      {episode.number_ep ?? "Full"}
                    </div>
                  </Tooltip>
                );
              })}
            </div>
          </div>
        </ContainerDetailMovie>
        <BannerMovies listBanners={banners} />
        {<InformationMovie profile={profile} />}
        <BannerMovies listBanners={banners} />
      </div>
    </>
  );
};

export default PresentationMovie;
