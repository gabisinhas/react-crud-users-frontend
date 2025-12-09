import { IUser } from '../userRegister/User';

interface UserListProps {
  users: IUser[];
  handleEdit: (user: IUser) => void;
  handleDelete: (id: number) => void;
}

const UserList: React.FC<UserListProps> = ({ users, handleEdit, handleDelete }) => {
  return (
    <div className="list">
      <h2>Usuários cadastrados</h2>
      {users.length === 0 && <p>Nenhum usuário</p>}
      <ul>
        {users.map(u => (
          <li key={u.id} className="user-item">
            <div>
              <strong>{u.nome}</strong>
              <div className="meta">{u.profissao} • {u.estadoCivil}</div>
              <div className="address">{u.endereco} • CEP: {u.cep}</div>
              <div className="mother">Mãe: {u.nomeMae}</div>
            </div>
            <div className="buttons">
              <button onClick={() => handleEdit(u)}>Editar</button>
              <button onClick={() => handleDelete(u.id)}>Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
