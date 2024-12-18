import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import { toast } from "react-toastify";

import { validationSchema } from "./resolver";
import { useUpdateSiteConfigMutation } from "@/services/siteConfigService";
import { ConfigSiteTypes } from "@/models/config-site";
interface SiteConfigFormInputs {
  contact: string;
  siteName: string;
}
const SiteConfigForm = ({
  refetch,
  editSiteConfig,
  handleClose,
}: {
  refetch: () => void;
  editSiteConfig: ConfigSiteTypes;
  handleClose: () => void;
}) => {
  const [updateSiteConfig] = useUpdateSiteConfigMutation();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SiteConfigFormInputs>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: SiteConfigFormInputs) => {
    try {
      const customData = {
        contact: data.contact,
        siteName: data.siteName,
        _id: editSiteConfig._id,
      };
      await updateSiteConfig(customData);
      refetch();
      handleClose();
      toast.success("사이트 구성을 성공적으로 편집했습니다.");
    } catch (error) {
      toast.error("편집 실패");
    }
  };

  useEffect(() => {
    setValue("contact", editSiteConfig.contact);
    setValue("siteName", editSiteConfig.siteName);
  }, [editSiteConfig, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Controller
        name="contact"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            sx={{
              height: "42px",
              color: "#C5C5C5",
              "& .MuiInputLabel-root": {
                color: "#C5C5C5",
                borderRadius: "9px",
              },
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#485159",
              },
              "& input": {
                color: "#C5C5C5",
              },
              marginBottom: "12px",
            }}
            label="접촉"
            variant="outlined"
            fullWidth
            error={!!errors.contact}
            helperText={errors.contact ? errors.contact.message : ""}
          />
        )}
      />

      <Controller
        name="siteName"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            sx={{
              height: "42px",
              color: "#C5C5C5",
              "& .MuiInputLabel-root": {
                color: "#C5C5C5",
                borderRadius: "9px",
              },
              "& input": {
                color: "#C5C5C5",
              },
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#485159",
              },
              marginBottom: "12px",
            }}
            type="text"
            label="사이트 이름"
            variant="outlined"
            fullWidth
            error={!!errors.siteName}
            helperText={errors.siteName ? errors.siteName.message : ""}
          />
        )}
      />
      <button
        type="submit"
        className="w-full h-[42px] flex items-center justify-center bg-[#5176FF] text-white mt-0 rounded-[9px]"
      >
        로그인
      </button>
    </form>
  );
};

export default SiteConfigForm;
