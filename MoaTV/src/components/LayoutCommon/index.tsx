"use client";
import React, { useEffect, useState } from "react";
import IntroduceMovie from "../IntroduceMovie";
import { AnnouncementType } from "@/models/announcement";
import { useGetAnnouncementsQuery } from "@/services/announcementService";
import Announcement from "../Announcement";
import { BannerType } from "@/models/ad";
import { useGetBannersQuery } from "@/services/bannerService";
import BannerMovies from "../BannerMovies";
import { usePathname } from "next/navigation";

const LayoutCommon = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const [announcements, setAnnouncements] = useState<AnnouncementType[]>([]);
  const [banners, setBanners] = useState<BannerType[]>([]);
  const { data: getAnnouncement } = useGetAnnouncementsQuery({ active: true });
  const { data: getBanners } = useGetBannersQuery({});
  
  useEffect(() => {
    if (getAnnouncement) setAnnouncements(getAnnouncement.data);
  }, [getAnnouncement]);

  useEffect(() => {
    if (getBanners) setBanners(getBanners.data);
  }, [getBanners]);

  return (
    <>
      <div className="container m-auto">
      <Announcement announcements={announcements} />
      </div>
      {isHomePage && <IntroduceMovie />}
      {!!banners && banners.length > 0 && (
        <div className="container m-auto py-2">
          <BannerMovies listBanners={banners} />
        </div>
      )}
      <div className="container m-auto">
      {children}
      </div>
    </>
  );
};

export default LayoutCommon;
