"use client";

import AdminNavbar from "@/components/AdminNavbar";
import AdminSidebar from "@/components/AdminSidebar";
import AuthProvider from "@/components/ContextPage/AuthContext";
import { Box, Toolbar } from "@mui/material";
import { ReactNode, useState } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const drawerWidth = "200px";
  const [mobileOpen, setMobilOpen] = useState<boolean>(false);

  const handleDrawerToggle = () => {
    setMobilOpen(!mobileOpen);
  };

  return (
    <AuthProvider>
      <AdminSidebar
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <AdminNavbar handleDrawerToggle={handleDrawerToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: {
            paddingLeft: drawerWidth,
          },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </AuthProvider>
  );
};

export default AdminLayout;
