import { Typography } from "@mui/material"

export const Header = () => {
  return (
    <header
      style={{
        gridColumn: '1 / span 2',
        backgroundColor: '#3f51b5',
        color: 'white',
        padding: '10px',
      }}
    >
      <Typography variant="h6">header</Typography>
    </header>
  )
}
