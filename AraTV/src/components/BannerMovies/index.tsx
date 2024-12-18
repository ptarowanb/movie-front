import React, { useState } from "react";
import Image from "next/image";
import { BannerType } from "@/models/ad";

const BannerMovies = ({ listBanners }: { listBanners: BannerType[] }) => {
  // const [thumbsAD,setTempsAD]= useState<BannerType[]>(
  //   [
  //     { 
  //       _id: "1da",
  //       url: "string",
  //       image: "string",
  //       shop_name: "string",
  //       add_time: "string",
  //       until: "strin",
  //       rank: "string",}
  //   ]
  // )
  const server = process.env.NEXT_PUBLIC_API_URL;
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {listBanners.map((banner) => (
          <div
            key={banner._id}
            className="cursor-pointer relative w-full aspect-[7.764]"
            onClick={() => window.open(banner.url, "_blank")}
          >
            <Image
              src={`${server}${banner.image}`}
              alt={`Banner ${banner._id}`}
              fill
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default BannerMovies;
