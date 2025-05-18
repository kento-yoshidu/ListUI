import { ReactNode } from "react"
import { Header } from "./Header"
import { Box } from "@mui/material"
import { Footer } from "./Footer"
import { SideBar } from "./SideBar"

export const Wrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        gridTemplateColumns: '200px 1fr',
      }}
    >
      <Header />

      <SideBar />

      {children}

      <Footer />
    </Box>
  )
}
