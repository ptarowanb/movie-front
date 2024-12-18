"use client";

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TextField } from "@mui/material";

import { ConfigSiteTypes } from "@/models/config-site";
import { useDeleteSiteConfigMutation } from "@/services/siteConfigService";
import ModalEditConfigSite from "../ModalEditConfigSite";

const ConfigSiteTable = ({
  configSites,
  refetch,
}: {
  configSites: ConfigSiteTypes[];
  refetch: () => void;
}) => {
  const [editSiteConfig, setEditSiteConfig] = React.useState({
    contact: "",
    siteName: "",
    _id: "",
  });
  const [deleteSiteConfig] = useDeleteSiteConfigMutation();
  const [showModalConfigSite, setShowConfigSite] = React.useState(false);
  const toDelete = async (id: string) => {
    await deleteSiteConfig(id);
    refetch();
  };
  const handleOpenEditConfigSite = (configSite: ConfigSiteTypes) => {
    setShowConfigSite(true);
    setEditSiteConfig(configSite);
  };
  const handleCloseEditConfigSite = () => {
    setShowConfigSite(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell className="text-center">Contact</TableCell>
              <TableCell className="text-center">Site name</TableCell>

              <TableCell className="text-center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {configSites.map((configSite) => (
              <TableRow
                key={configSite._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">
                  <TextField
                    size="small"
                    className="w-full"
                    label="Contact"
                    id="contact"
                    value={configSite.contact}
                  />
                </TableCell>
                <TableCell align="left">
                  <TextField
                    size="small"
                    className="w-full"
                    label="Site name"
                    id="siteName"
                    value={configSite.siteName}
                  />
                </TableCell>

                <TableCell align="center">
                  <div className="flex gap-1">
                    <Button
                      onClick={() => handleOpenEditConfigSite(configSite)}
                      variant="outlined"
                      color="warning"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => toDelete(`${configSite._id}`)}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalEditConfigSite
        open={showModalConfigSite}
        handleClose={handleCloseEditConfigSite}
        refetch={refetch}
        editSiteConfig={editSiteConfig}
      />
    </>
  );
};

export default ConfigSiteTable;
