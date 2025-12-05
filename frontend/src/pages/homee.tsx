
import { Box, Typography, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      padding={3}
      bgcolor="#0D3B66"
    >
      {/* Título pedido */}
      <Paper
        elevation={6}
        sx={{
          padding: 5,
          width: "100%",
          maxWidth: 520,
          textAlign: "center",
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={1}
          color="primary"
        >
          Bem-vindo
        </Typography>

        <Typography
          variant="h5"
          fontWeight="medium"
          mb={3}
        >
          Sistema de Ponto Extensionista
        </Typography>

        <Typography variant="body1" mb={4} color="text.secondary">
          Acesse e gerencie seus projetos, extensionistas e registros de ponto
          de maneira prática e eficiente.
        </Typography>

        <Box display="flex" flexDirection="column" gap={2}>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/projetos"
            fullWidth
          >
            Projetos
          </Button>

          <Button
            variant="contained"
            size="large"
            color="secondary"
            component={Link}
            to="/extensionistas"
            fullWidth
          >
            Extensionistas
          </Button>

          <Button
            variant="contained"
            size="large"
            color="success"
            component={Link}
            to="/pontos"
            fullWidth
          >
            Pontos
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
