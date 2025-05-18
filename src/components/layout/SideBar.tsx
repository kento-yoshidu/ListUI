import { List, ListItem, ListItemText } from "@mui/material"
import Link from "next/link";

export const SideBar = () => {
  const links = [
    {
      href: "/files",
      label: "ファイル一覧",
    },
    {
      href: "/search",
      label: "検索",
    },
    {
      href: "/tags",
      label: "タグ一覧",
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
  );
};
