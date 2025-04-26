import type { Dispatch, SetStateAction } from "react";
import { Breadcrumbs, Container, Grid, Grid2, Typography } from "@mui/material";

type BreadCrumb = {
  id: number;
  name: string;
};

type Props = {
  breadcrumbs: BreadCrumb[];
  setCurrentPath: Dispatch<SetStateAction<number>>;
};

export const BreadCrumb: React.FC<Props> = ({ breadcrumbs, setCurrentPath }) => {
  console.log("bread", breadcrumbs);

  return (
    <Container maxWidth="md">
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
                  onClick={() => setCurrentPath(bc.id)}
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

        <Grid item xs={12}>
          {/* フォルダーや写真などの中身 */}
          <Typography variant="h5">このフォルダーの中身</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};
