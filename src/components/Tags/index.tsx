import { useGetTags } from "@/apis/useGetTags"
import { Box, List, ListItem, Typography } from "@mui/material";
import { PageTitle } from "../common/PageTitle";

export const Tags = () => {
  const { data, isLoading } = useGetTags();

  if (isLoading) {
    return (
      <p>loading...</p>
    );
  }

  return (
    <>
      <PageTitle title="タグ一覧" />

      <Box>
        <List>
          {data?.data.map((tag) => (
            <ListItem>
              {tag.tag}
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  )
}
