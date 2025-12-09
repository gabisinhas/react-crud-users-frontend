import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Box,
  Button,
  Stack
} from "@mui/material";

import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ListAltIcon from '@mui/icons-material/ListAlt';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1 className="landing-title">Bem Vindo!</h1>

      <Box sx={{ p: 3, maxWidth: 400, margin: "0 auto" }}>
        <Paper className="user-form-container" elevation={3} sx={{ p: 3 }}>

          <Stack spacing={2}>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<PersonAddAlt1Icon />}
              onClick={() => navigate('/cadastrar')}
            >
              Cadastrar Novo Usuário
            </Button>

            <Button
              variant="contained"
              color="secondary"
              fullWidth
              startIcon={<ListAltIcon />}
              onClick={() => navigate('/listar')}
            >
              Listar Usuários
            </Button>

          </Stack>

        </Paper>
      </Box>
    </div>
  );
}
