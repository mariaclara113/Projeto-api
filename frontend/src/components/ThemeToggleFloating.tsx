import { Fab } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

interface ThemeToggleFloatingProps {
  toggleColorMode: () => void;
  mode: "light" | "dark";
}

const ThemeToggleFloating = ({ toggleColorMode, mode }: ThemeToggleFloatingProps) => {
  return (
    <Fab
      color="primary"
      onClick={toggleColorMode}
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 1000,
      }}
    >
      {mode === "light" ? <Brightness4 /> : <Brightness7 />}
    </Fab>
  );
};

export default ThemeToggleFloating;
