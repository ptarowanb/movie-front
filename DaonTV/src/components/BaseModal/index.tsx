import { Box, Modal } from "@mui/material";
import Image from "next/image";
import React from "react";
import logo from "@/assets/logo.png";

export default function BaseModal({
  textColor,
  bgColor,
  status,
  children,
  open,
  handleClose,
}: {
  textColor?: string;
  bgColor?: string;
  status?: string;
  children: React.ReactNode;
  open: boolean;
  handleClose: () => void;
}) {
  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: bgColor ?? "#2C3339",
    color: textColor ?? "white",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: "81px",
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <>
        {status === "login" && (
          <div className="absolute z-30 -translate-x-1/2 left-1/2 top-20">
            <div className="relative w-[223px] h-[93px] object-fill">
              <Image src={logo} alt="logo" fill />
            </div>
          </div>
        )}
        <Box sx={{ ...style, width: 400, borderRadius: "12px" }}>
          {children}
        </Box>
      </>
    </Modal>
  );
}
