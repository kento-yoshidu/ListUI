import { Box, Typography } from "@mui/material";
import { File, Folder } from "./Table";

type Props = {
  selectedFolder: Folder[]
  selectedFile: File[];
}

export const Information = ({
  selectedFolder,
  selectedFile,
}: Props) => {
  return (
    <Box>
      Information

      <Typography>
        {selectedFolder[0].name}
      </Typography>
    </Box>
  )
}
