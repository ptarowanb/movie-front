import { BannerType } from "@/models/ad";
import Image from "next/image";
import React from "react";
const server = process.env.NEXT_PUBLIC_API_URL;
const PresentationBannerMovie = ({ banners }: { banners: BannerType[] }) => {
  return (
    <div className="grid grid-cols-12 gap-1">
      {banners.length % 4 === 0 && banners.length > 0 ? (
        banners.map((item) => (
          <div
            key={item._id}
            className=" relative w-full col-span-12 md:col-span-3 aspect-[660/85]"
          >
            <Image
              src={`${server}${item.image}`}
              alt={item.image ?? ""}
              fill
              className="object-cover cursor-pointer"
              onClick={() => window.open(item.url, "_blank")}
            />
          </div>
        ))
      ) : banners.length % 3 === 0 && banners.length > 0 ? (
        banners.map((item) => (
          <div
            key={item._id}
            className="relative col-span-12 md:col-span-4 w-full aspect-[660/85]"
          >
            <Image
              src={`${server}${item.image}`}
              alt={item.image ?? ""}
              fill
              className="object-cover cursor-pointer"
              onClick={() => window.open(item.url, "_blank")}
            />
          </div>
        ))
      ) : banners.length % 2 === 0 && banners.length > 0 ? (
        <div className="relative col-span-12 md:col-span-6 w-full aspect-[660/85]">
          <Image
            src={`${server}${banners[0].image}`}
            alt={banners[0].image ?? ""}
            fill
            className="object-cover cursor-pointer"
            onClick={() => window.open(banners[0].url, "_blank")}
          />
        </div>
      ) : banners.length === 1 ? (
        <div className="relative col-span-12 w-full aspect-[660/85]">
          <Image
            src={`${server}${banners[0].image}`}
            alt={banners[0].image ?? ""}
            fill
            className="object-cover cursor-pointer"
            onClick={() => window.open(banners[0].url, "_blank")}
          />
        </div>
      ) : null}
    </div>
  );
};

export default PresentationBannerMovie;
