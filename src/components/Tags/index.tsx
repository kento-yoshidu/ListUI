import { useGetTags } from "@/apis/useGetTags"
import { Box, List, ListItem } from "@mui/material";
import { PageTitle } from "@/components/common/PageTitle";

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
