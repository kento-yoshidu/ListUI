import { List, ListItem, ListItemText, Typography } from "@mui/material"
import Link from "next/link";

export const SideBar = () => {
  const links = [
    {
      href: "/files",
      label: "File Explorer",
    },
    {
      href: "/search",
      label: "Search",
    },
  ];

  return (
    <aside style={{ backgroundColor: "#f4f4f4", padding: "20px" }}>
      <List>
        {links.map((link) => (
          <ListItem key={link.href} disablePadding>
            <Link href={link.href} passHref legacyBehavior>
              <ListItemText
                primary={link.label}
                sx={{
                  padding: "4px 16px",
                  cursor: "pointer",
                  ":hover": { backgroundColor: "#e0e0e0" },
                }}
              />
            </Link>
          </ListItem>
        ))}
      </List>
    </aside>
  )
}
