import React from "react";
import ContainerDetailMovie from "../ContainerDetailMovie";
import Image from "next/image";
import { ProfilesType } from "@/models/movie";
import not_img from "@/assets/images/no_img.jpg";
import ic_heart from "@/assets/icons/ic_heart.svg";
import ic_share from "@/assets/icons/ic_share.svg";
import { Rating } from "@mui/material";
const InformationMovie = ({ profile }: { profile: ProfilesType }) => {

  return (
    <ContainerDetailMovie>
      <div className="flex flex-col xl:flex-row gap-6 xl:gap-[50px]">
        <div className="relative w-full xl:w-1/4 aspect-[0.697]">
          <Image
            src={profile?.image ?? not_img}
            alt={profile?.title ?? "title"}
            fill
            className="rounded-[10px] object-cover"
          />
        </div>

        <div className="flex flex-col w-full gap-5 px-4 mt-0 xl:w-2/4 xl:mt-6">
          <div className="flex flex-col gap-2">
            <h4 className="text-2xl font-semibold xl:text-[32px] truncate">
              {profile?.title ?? "No title"}
            </h4>
            <Rating name="read-only" value={4.5} readOnly />
          </div>

          <div className="flex items-center gap-8">
            {profile.release_date && (
              <span className="text-sm font-medium">{`개봉: ${profile.release_date}`}</span>
            )}
            {profile.location && (
              <span className="text-sm font-medium">
                국가:{profile.location}
              </span>
            )}
          </div>

          <h5 className="text-xl truncate">
            줄거리
          </h5>
          <span className="text-sm font-medium">
            {profile?.des ?? "No intro"}
          </span>
        </div>

        {/* <div className="flex flex-col gap-4 xl:gap-[70px] w-full xl:w-1/4 mt-0 xl:mt-6 px-4">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-2">
              <div className="relative w-6 h-6">
                <Image src={ic_heart} alt="ic_heart" fill />
              </div>
              <span className="text-sm font-medium">Follow</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative w-6 h-6">
                <Image src={ic_share} alt="ic_share" fill />
              </div>
              <span className="text-sm font-medium">Share</span>
            </div>
          </div>

          <div className="flex flex-col gap-[2px] font-light text-base leading-5">
            {!!profile.actor && typeof profile.actor !== 'string' &&
              JSON.parse(profile.actor).length > 0 &&
              JSON.parse(profile.actor)[0] !== null && (
                <span>
                  출연:
                  {JSON.parse(profile.actor)
                    .map((act: string) => act)
                    .join(", ")}
                </span>
              )}
            {profile.genre && <span>장르:{profile.genre}</span>}
            <span>감독:김재훈</span>
          </div>
        </div> */}
        {/*Design change 2024-10-02 jun*/}
        <div className="flex flex-col w-full gap-6 px-4 mt-0 xl:gap-8 xl:w-1/4 xl:mt-6">
          <div className="flex items-center justify-between bg-[#2C2C2E] p-4 rounded-lg">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="relative w-5 h-5">
                <Image src={ic_heart} alt="ic_heart" fill />
              </div>
              <span className="text-sm font-medium text-white">Follow</span>
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="relative w-5 h-5">
                <Image src={ic_share} alt="ic_share" fill />
              </div>
              <span className="text-sm font-medium text-white">Share</span>
            </div>
          </div>

          <div className="flex flex-col bg-[#1C1C1E] p-4 rounded-lg text-gray-300 text-sm leading-6">
            {!!profile.actor && typeof profile.actor !== 'string' && JSON.parse(profile.actor).length > 0 && JSON.parse(profile.actor)[0] !== null && (
              <span>
                <strong className="text-white">출연:</strong> {JSON.parse(profile.actor).map((act: string) => act).join(", ")}
              </span>
            )}
            {profile.genre && (
              <span>
                <strong className="text-white">장르:</strong> {profile.genre}
              </span>
            )}
            <span>
              <strong className="text-white">감독:</strong> 김재훈
            </span>
          </div>
        </div>
      </div>

    </ContainerDetailMovie>
  );
};

export default InformationMovie;
