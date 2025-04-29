import { File } from "../Table";

type Props = {
  selectedFile: File;
}

export const SinglePhoto = ({ selectedFile }: Props) => {
  console.log("se", selectedFile);

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
    </>
  )
}
