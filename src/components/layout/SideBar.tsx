import Link from "next/link";
import { List, ListItem, ListItemText } from "@mui/material";

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
            <Link
              href={link.href}
              passHref
              legacyBehavior
            >
              <ListItemText
                primary={link.label}
                slotProps={{
                  primary: {
                    sx: {
                      padding: "12px 16px",
                      borderRadius: 2,
                      fontSize: "14px",
                      fontWeight: 600,
                      cursor: "pointer",
                      ":hover": { backgroundColor: "#a0a0a0" },
                    },
                  },
                }}
              />
            </Link>
          </ListItem>
        ))};
      </List>
    </aside>
  );
};
