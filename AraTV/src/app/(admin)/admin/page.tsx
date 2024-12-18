"use client";

import AdminSiteConfig from "@/components/AdminSiteConfig";
import BannerTable from "@/components/BannerTable";
import ConfigSiteTable from "@/components/ConfigSiteTable";
import { useAuth } from "@/components/ContextPage/AuthContext";
import DragAndDrop from "@/components/DragAndDrop";
import ModalLogin from "@/components/ModalLogin";
import SetAnnouncement from "@/components/SetAnnouncement";
import { BannerType } from "@/models/ad";
import { AnnouncementType } from "@/models/announcement";
import { ConfigSiteTypes } from "@/models/config-site";
import {
  useDeleteAnnouncementMutation,
  useGetAnnouncementsQuery,
  useUpdateAnnouncementMutation,
} from "@/services/announcementService";
import { useGetBannersQuery } from "@/services/bannerService";
import { useGetSiteConfigQuery } from "@/services/siteConfigService";
// import withAuth from "@/utils/withAuth";
import { Chip } from "@mui/material";
import { useEffect, useState } from "react";

const AdminPage = () => {
  const { user, isModalOpen, closeModal, openAuthModal } = useAuth();
  const { data: getBanners, refetch: refetchBanner } = useGetBannersQuery({});
  const [banners, setBanners] = useState<BannerType[]>([]);
  const [announcements, setAnnouncements] = useState<AnnouncementType[]>([]);
  const [siteConfig, setSiteConfig] = useState<ConfigSiteTypes[]>([]);
  const { data: getAnnouncements, refetch: refetchAnnouncement } =
    useGetAnnouncementsQuery({ active: null });

  const { data: getSiteConfig, refetch: refetchSiteConfig } =
    useGetSiteConfigQuery({});

  const [updateStatus] = useUpdateAnnouncementMutation();
  const [deleteAnnouncement] = useDeleteAnnouncementMutation();

  const changeStat = async (id: string) => {
    await updateStatus(id);
    refetchAnnouncement();
  };

  const deleteAnnounce = async (id: string) => {
    await deleteAnnouncement(id);
    refetchAnnouncement();
  };

  useEffect(() => {
    if (getBanners) setBanners(getBanners.data);
  }, [getBanners]);

  useEffect(() => {
    if (getAnnouncements) setAnnouncements(getAnnouncements.data);
  }, [getAnnouncements]);

  useEffect(() => {
    if (getSiteConfig) setSiteConfig(getSiteConfig.data);
  }, [getSiteConfig]);

  useEffect(() => {
    if (!user) {
      openAuthModal();
    }
  }, [user, openAuthModal]);

  return (
    <>
      {!user ? (
        <ModalLogin open={isModalOpen} handleClose={closeModal} />
      ) : (
        <div className="p-4 flex flex-col gap-2">
          <div className="w-full h-full p-4 bg-current">
            <h1 className="text-gray-600 text-3xl">Set Announcement</h1>
            <SetAnnouncement refetch={refetchAnnouncement} />
            <div className="flex flex-wrap gap-2 pt-2">
              {announcements &&
                announcements.map(
                  (announce: AnnouncementType, index: number) => (
                    <Chip
                      key={index}
                      label={announce.announcement}
                      color={announce.status ? "success" : "primary"}
                      variant={announce.status ? "filled" : "outlined"}
                      onDelete={() => deleteAnnounce(announce._id)}
                      onClick={() => changeStat(announce._id)}
                    />
                  )
                )}
            </div>
          </div>
          <div className="w-full h-full p-4 bg-current">
            <h1 className="text-gray-600 text-3xl">Set Banners</h1>
            <div className="flex flex-col gap-2">
              <DragAndDrop refetch={refetchBanner} />
              <BannerTable banners={banners} refetch={refetchBanner} />
            </div>
          </div>
          <div className="w-full h-full p-4 bg-current">
            <h1 className="text-gray-600 text-3xl">Site config</h1>
            <AdminSiteConfig refetch={refetchSiteConfig} />
            <ConfigSiteTable
              configSites={siteConfig}
              refetch={refetchSiteConfig}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPage;
