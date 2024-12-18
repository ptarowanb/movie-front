"use client";
import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { usePostSiteConfigMutation } from "@/services/siteConfigService";
export default function AdminSiteConfig({
  refetch
}: {

  refetch: () => void;
}) {
  const [addSiteConfig] = usePostSiteConfigMutation({});
  const [valueSiteConfig, setValueSiteConfig] = useState({
    siteName: "",
    contact: "",
  });

  const handleSubmit = async () => {
    await addSiteConfig(valueSiteConfig);
    setValueSiteConfig({ siteName: "", contact: "" });
    refetch()
  };

  return (
    <div className="w-full flex items-center gap-2 text-black">
      <TextField
        label="Contact"
        className="w-full text-center"
        value={valueSiteConfig.contact}
        id="contact"
        onChange={(e) => {
          setValueSiteConfig({ ...valueSiteConfig, contact: e.target.value });
        }}
      />
      <TextField
        label="Site name"
        value={valueSiteConfig.siteName}
        className="w-full text-center"
        id="site-config"
        onChange={(e) => {
          setValueSiteConfig({ ...valueSiteConfig, siteName: e.target.value });
        }}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{
          width: "200px",
        }}
        onClick={handleSubmit}
      >
        Set site config
      </Button>
    </div>
  );
}
