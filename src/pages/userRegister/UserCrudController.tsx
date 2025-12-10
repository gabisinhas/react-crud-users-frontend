import React, { useState } from "react";
import { IUser } from "./User";
import UserView from "./UserCrudView";

const API_URL = import.meta.env.VITE_APP_API_URL; 

const emptyUser: IUser  = {
  nome: "",
  endereco: "",
  cep: "",
  profissao: "",
  nomeMae: "",
  estadoCivil: "",
};

const UserController: React.FC = () => {
  const [form, setForm] = useState(emptyUser);
  const [users, setUsers] = useState<IUser[]>([]);
  const [editing, setEditing] = useState(false);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(""); 

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
  }

  const errors = {
    nome: !form.nome.trim(),
    endereco: !form.endereco.trim(),
    nomeMae: !form.nomeMae.trim(),
    estadoCivil: form.estadoCivil === "",
  };

  function handleClear() {
    setForm(emptyUser);
    setTouched({});
    setEditing(false);
  }

  async function handleSubmit() {
    try {
      setLoading(true);
      setError("");
      const start = Date.now();

      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao criar usuário');
      }

      const newUser = await response.json();
      const elapsed = Date.now() - start;
      const waitTime = elapsed < 3000 ? 3000 - elapsed : 0;
      await new Promise(res => setTimeout(res, waitTime));

      setUsers(prev => [...prev, newUser]);
      handleClear();
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "Erro inesperado");
      setTimeout(() => setError(""), 5000);
    } finally {
      setLoading(false);
    }
  }

  async function validateBeforeSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ nome: true, endereco: true, nomeMae: true, estadoCivil: true });

    if (errors.nome || errors.endereco || errors.nomeMae || errors.estadoCivil) return;

    await handleSubmit();
  }

  return (
    <UserView
      form={form}
      errors={errors}
      touched={touched}
      editing={editing}
      loading={loading}
      success={success}
      error={error}
      handleChange={handleChange}
      handleBlur={handleBlur}
      handleSubmit={validateBeforeSubmit}
      handleClear={handleClear}
    />
  );
};

export default UserController;
