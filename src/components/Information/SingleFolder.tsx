import { Dispatch, SetStateAction } from "react";
import { File, Folder } from "../Table";
import { ButtonList } from "./ButtonList";

type Props = {
  selectedFolder: Folder;
  setIsOpenUpdateFolderModal: Dispatch<SetStateAction<boolean>>;
}

export const SingleFolder = ({
  selectedFolder,
  setIsOpenUpdateFolderModal,
}: Props) => {
  return (
    <>
      <p>
        {selectedFolder.name}
      </p>

      <ButtonList
        currentFolderId={selectedFolder.id}
        photoId={selectedFolder.id}
        setIsOpenUpdateFolderModal={setIsOpenUpdateFolderModal}
      />
    </>
  )
}

