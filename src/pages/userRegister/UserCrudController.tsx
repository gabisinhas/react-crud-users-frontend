import React, { useState } from "react";
import { IUser } from "./User";
import UserView from "./UserCrudView";

const API_URL = import.meta.env.VITE_APP_API_URL; 

const emptyUser: IUser = {
  nome: "",
  endereco: "",
  cep: "",
  profissao: "",
  nomeMae: "",
  estadoCivil: "",
};

const UserController: React.FC = () => {
  const [form, setForm] = useState<IUser>(emptyUser);
  const [users, setUsers] = useState<IUser[]>([]);
  const [editing, setEditing] = useState<boolean>(false);
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState<boolean>(false);

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
      setUsers(prev => [...prev, newUser]);
      handleClear();
    } catch (error: any) {
      console.error('Erro ao salvar usuário:', error);
      alert(error.message);
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
      handleChange={handleChange}
      handleBlur={handleBlur}
      handleSubmit={validateBeforeSubmit}
      handleClear={handleClear}
      loading={loading} 
    />
  );
};

export default UserController;
