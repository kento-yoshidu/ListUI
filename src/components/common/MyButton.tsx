import type { Dispatch, SetStateAction } from "react"
import { Button } from "@mui/material"

type Props = {
  text: string;
  handleClick: Dispatch<SetStateAction<boolean>>;
}

export const MyButton = ({
  text,
  handleClick,
}: Props) => {
  return (
    <Button
      variant="outlined"
      onClick={() => handleClick(true)}
      sx={{ textTransform: "none" }}
    >
      {text}
    </Button>
  )
}
