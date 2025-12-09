import React, { useState } from "react";
import { IUser } from "./User";
import UserView from "./UserCrudView";
import UserList from "../userList/UserList";

const emptyUser: IUser = {
  id: 0,
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    setTouched(prev => ({ ...prev, [e.target.name]: true }));
  }

  const errors = {
    nome: !form.nome.trim(),
    endereco: !form.endereco.trim(),
    nomeMae: !form.nomeMae.trim(),
    estadoCivil: form.estadoCivil === "", 
  };

  function validateBeforeSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setTouched({ nome: true, endereco: true, nomeMae: true, estadoCivil: true });

    if (errors.nome || errors.endereco || errors.nomeMae || errors.estadoCivil) return;

    handleSubmit();
  }

  function handleSubmit() {
    if (editing) {
      setUsers(prev => prev.map(u => (u.id === form.id ? form : u)));
    } else {
      setUsers(prev => [...prev, { ...form, id: Date.now() }]);
    }

    handleClear();
  }

  function handleClear() {
    setForm(emptyUser);
    setTouched({});
    setEditing(false);
  }


  return (
    <>
      <UserView
        form={form}
        errors={errors}
        touched={touched}
        editing={editing}
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleSubmit={validateBeforeSubmit}
        handleClear={handleClear}
      />
    </>
  );
};

export default UserController;
