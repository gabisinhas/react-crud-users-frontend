import React, { forwardRef } from "react";
import {
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Box,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import { IUser } from "./User";
import { IMaskInput } from "react-imask";
import "./UserView.css";

const MaskedInputCEP = forwardRef<HTMLInputElement, any>(({ onChange, ...props }, ref) => (
  <IMaskInput
    {...props}
    mask="00000-000"
    inputRef={ref}
    onAccept={(value: string) => {
      onChange({ target: { name: props.name, value } });
    }}
    overwrite
  />
));
MaskedInputCEP.displayName = "MaskedInputCEP";

interface UserViewProps {
  form: IUser;
  errors: { nome: boolean; endereco: boolean; nomeMae: boolean; estadoCivil?: boolean };
  touched: { [key: string]: boolean };
  editing: boolean;
  loading: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleClear: () => void;
}

const UserView: React.FC<UserViewProps> = ({
  form,
  errors,
  touched,
  editing,
  loading,
  handleChange,
  handleBlur,
  handleSubmit,
  handleClear,
}) => {
  return (
    <div className="user-page">
      <Box sx={{ p: 3 }}>
        <h1 className="landing-title">Cadastrar Novo Usuário</h1>
        <Paper className="user-form-container" elevation={3}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nome completo"
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.nome && errors.nome}
                  helperText={touched.nome && errors.nome ? "campo obrigatório" : ""}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Endereço"
                  name="endereco"
                  value={form.endereco}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.endereco && errors.endereco}
                  helperText={touched.endereco && errors.endereco ? "campo obrigatório" : ""}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="CEP"
                  name="cep"
                  value={form.cep}
                  onChange={handleChange}
                  InputProps={{ inputComponent: MaskedInputCEP as any }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Profissão"
                  name="profissao"
                  value={form.profissao}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nome da mãe"
                  name="nomeMae"
                  value={form.nomeMae}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.nomeMae && errors.nomeMae}
                  helperText={touched.nomeMae && errors.nomeMae ? "campo obrigatório" : ""}
                />
              </Grid>

              <Grid item xs={12} sm={6} width={150}>
                <FormControl fullWidth error={touched.estadoCivil && !!errors.estadoCivil}>
                  <InputLabel>Estado civil</InputLabel>
                  <Select
                    name="estadoCivil"
                    value={form.estadoCivil}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Estado civil"
                  >
                    <MenuItem value="">
                      <em>Selecione</em>
                    </MenuItem>
                    <MenuItem value="Solteiro(a)">Solteiro(a)</MenuItem>
                    <MenuItem value="Casado(a)">Casado(a)</MenuItem>
                    <MenuItem value="Divorciado(a)">Divorciado(a)</MenuItem>
                    <MenuItem value="Viúvo(a)">Viúvo(a)</MenuItem>
                  </Select>
                  {touched.estadoCivil && errors.estadoCivil && (
                    <FormHelperText>campo obrigatório</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>

            <Box className="button-container" sx={{ mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : null}
              >
                {editing ? (loading ? "Atualizando..." : "Atualizar") : loading ? "Salvando..." : "Criar"}
              </Button>

              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClear}
                sx={{ ml: 2 }}
                disabled={loading}
              >
                Limpar
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </div>
  );
};

export default UserView;
