import { Box } from "@mui/material";
import { File, Folder } from "./Table";
import { SinglePhoto } from "./Information/SinglePhoto";

type Props = {
  currentFolderId: number;
  selectedFolder: Folder[];
  selectedFile: File[];
}

export const Information = ({
  currentFolderId,
  selectedFolder,
  selectedFile,
}: Props) => {
  let Component;

  if (selectedFile.length === 1 && selectedFolder.length === 0) {
    Component =
      <SinglePhoto
        currentFolderId={currentFolderId}
        selectedFile={selectedFile[0]}
      />;
  } else {
    Component = <p>info</p>;
  }

  return (
    <Box
      sx={{
        height: "100%",
        borderLeft: "1px solid #444",
      }
      }
    >
      {Component}
    </Box>
  )
}
