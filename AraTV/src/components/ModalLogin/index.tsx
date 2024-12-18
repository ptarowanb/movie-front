import { Typography } from "@mui/material";
import React from "react";

import Image from "next/image";
import ic_close from "@/assets/icons/ic_close.svg";
import LoginForm from "../LoginForm";
import BaseModal from "../BaseModal";

const ModalLogin = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  return (
    <BaseModal open={open} handleClose={handleClose} status="login">
      <div
        className="absolute cursor-pointer top-4 right-4"
        onClick={handleClose}
      >
        <div className="relative w-[20px] h-[20px]">
          <Image src={ic_close} alt="ic_close" fill />
        </div>
      </div>
      <div className="mt-[50px] flex flex-col">
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 32,
            marginBottom: "24px",
          }}
        >
          로그인
        </Typography>
        <LoginForm />
      </div>
    </BaseModal>
  );
};

export default ModalLogin;
