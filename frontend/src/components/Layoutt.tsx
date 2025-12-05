import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <AppBar position="static">
        <Toolbar style={{ gap: "16px" }}>
          <Button color="inherit" component={Link} to="/home">
            Home
          </Button>
        </Toolbar>
      </AppBar>

      <Outlet />
    </>
  );
}