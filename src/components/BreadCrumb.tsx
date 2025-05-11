import type { Dispatch, SetStateAction } from "react";
import { Box, Breadcrumbs, Container, Grid, Grid2, Typography } from "@mui/material";
import { File, Folder } from "./Table";

type BreadCrumb = {
  id: number;
  name: string;
};

type Props = {
  breadcrumbs: BreadCrumb[];
  setCurrentPath: Dispatch<SetStateAction<number>>;
  setSelectedFolder: Dispatch<SetStateAction<Folder[]>>;
  setSelectedFile: Dispatch<SetStateAction<File[]>>;
};

export const BreadCrumb: React.FC<Props> = ({
  breadcrumbs,
  setCurrentPath,
  setSelectedFolder,
  setSelectedFile,
}) => {
  const handleClick = (id: number) => {
    setCurrentPath(id);
    setSelectedFile([]);
    setSelectedFolder([]);
  };

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Breadcrumbs
            aria-label="breadcrumb"
          >
            {breadcrumbs.map((bc, index) =>
              index < breadcrumbs.length - 1 ? (
                <Typography
                  key={bc.id}
                  color="inherit"
                  onClick={() => handleClick(bc.id)}
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  {bc.name}
                </Typography>
              ) : (
                <Typography key={bc.id} color="text.primary">
                  {bc.name}
                </Typography>
              )
            )}
          </Breadcrumbs>
        </Grid>
      </Grid>
    </Box>
  );
};
