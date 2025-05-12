import { Dispatch, SetStateAction } from "react";
import { File } from "../Table";
import { ButtonList } from "./ButtonList";

type Props = {
  currentFolderId: number;
  selectedFile: File;
  setIsOpenUpdateFolderModal: Dispatch<SetStateAction<boolean>>;
}

export const SinglePhoto = ({
  selectedFile,
  currentFolderId,
  setIsOpenUpdateFolderModal,
}: Props) => {
  return (
    <>
      <p>
        {selectedFile.title}
      </p>

      <img
        width="240px"
        src={selectedFile.image_path}
      />

      {selectedFile.tags.map((tag) => (
        <p>{tag}</p>
      ))}

      <ButtonList
        currentFolderId={currentFolderId}
        photoId={selectedFile.id}
        setIsOpenUpdateFolderModal={setIsOpenUpdateFolderModal}
      />
    </>
  )
}
