import { useGetFiles } from "@/hooks/useGetFiles";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Folder } from "@mui/icons-material";
import { useState } from "react";
import { BreadCrumb } from "@/components/BreadCrumb";

export default function Home() {
  const [currentPath, setCurrentPath] = useState<number>(1);

  const { data, isLoading } = useGetFiles(currentPath);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Typography>子フォルダー一覧 {data.folder.id}</Typography>

      <BreadCrumb
        breadcrumbs={data.breadcrumbs}
        setCurrentPath={setCurrentPath}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableCell>title</TableCell>
            <TableCell>description</TableCell>
          </TableHead>

          <TableBody>
            {data.child_folders.map((folder: any) => (
              <TableRow
                key={folder.id}
                onDoubleClick={() => setCurrentPath(folder.id)}
                hover
              >
                <Folder color="primary" />
                <TableCell>{folder.name}</TableCell>
                <TableCell>{folder.description}</TableCell>
              </TableRow>
            ))}

            {/* 写真の一覧 */}
            {data.photos.map((photo: any) => (
              <TableRow key={`photo-${photo.id}`}>
                <TableCell>🖼️ 写真</TableCell>
                <TableCell>{photo.title || "（無題）"}</TableCell>
                <TableCell>{photo.description || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
