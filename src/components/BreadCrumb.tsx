import type { Dispatch, SetStateAction } from "react";
import { Box, Breadcrumbs, Grid, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { File, Folder } from "@/type/type";

type BreadCrumb = {
  id: number;
  name: string;
};

type Props = {
  breadcrumbs: BreadCrumb[];
  setCurrentPath: Dispatch<SetStateAction<number>>;
  setSelectedFolder: Dispatch<SetStateAction<Folder[]>>;
  setSelectedFile: Dispatch<SetStateAction<File[]>>;
  isLoading: boolean;
};

export const BreadCrumb: React.FC<Props> = ({
  breadcrumbs,
  setCurrentPath,
  setSelectedFolder,
  setSelectedFile,
  isLoading,
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
          {!isLoading && (
            <Breadcrumbs
              aria-label="breadcrumb"
            >
              {breadcrumbs.length > 1 && (
                <Box
                  onClick={() => handleClick(breadcrumbs[breadcrumbs.length - 2].id)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <ArrowBackIcon
                    sx={{
                      mr: 0.5,
                      fontSize: 22,
                    }} />
                </Box>
              )}

              {breadcrumbs.map((bc, index) =>
                index < breadcrumbs.length - 1 ? (
                  <Typography
                    key={bc.id}
                    color="inherit"
                    onClick={() => handleClick(bc.id)}
                    sx={{
                      cursor: "pointer",
                      textDecoration: "underline",
                      fontWeight: 600,
                    }}
                  >
                    {bc.name}
                  </Typography>
                ) : (
                  <Typography
                    key={bc.id}
                    color="text.primary"
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    {bc.name}
                  </Typography>
                )
              )}
            </Breadcrumbs>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};
