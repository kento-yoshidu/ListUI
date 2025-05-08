import { File } from "../Table";
import { ButtonList } from "./ButtonList";

type Props = {
  currentFolderId: number;
  selectedFile: File;
}

export const SinglePhoto = ({ selectedFile, currentFolderId }: Props) => {
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
      />
    </>
  )
}
