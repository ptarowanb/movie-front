import React from "react";
import BaseModal from "../BaseModal";
import SiteConfigForm from "../FormEditConfigSite";
import { ConfigSiteTypes } from "@/models/config-site";

export default function ModalEditConfigSite({
  open,
  handleClose,
  refetch,
  editSiteConfig,
}: {
  open: boolean;
  handleClose: () => void;
  refetch: () => void;
  editSiteConfig: ConfigSiteTypes;
}) {
  return (
    <BaseModal
      open={open}
      handleClose={handleClose}
      bgColor="white"
      textColor="black"
    >
      <h3 className="text-center font-semibold text-xl mb-4">
        Edit Config site
      </h3>
      <SiteConfigForm
        handleClose={handleClose}
        refetch={refetch}
        editSiteConfig={editSiteConfig}
      />
    </BaseModal>
  );
}
