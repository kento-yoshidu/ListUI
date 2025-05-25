import type { ReactNode } from "react";
import { Box, Button, Typography } from "@mui/material";

export const ModalInner = ({
  children,
  modalTitle,
  onSubmit,
  onClose,
}: {
  children: ReactNode;
  modalTitle: string;
  onSubmit: () => void;
  onClose: () => void;
}) => (
  <Box
    component="form"
    onSubmit={onSubmit}
    sx={{
      position: "absolute" as const,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "40%",
      bgcolor: "background.paper",
      borderRadius: 1,
      boxShadow: 24,
      p: 5,
    }}
  >
    <Typography
      variant="h6"
      mb={2}
    >
      {modalTitle}
    </Typography>

    {children}

    <Box mt={3} display="flex" justifyContent="flex-end">
      <Button onClick={onClose} sx={{ mr: 1 }}>キャンセル</Button>
      <Button variant="contained" type="submit">OK</Button>
    </Box>
  </Box>
);
