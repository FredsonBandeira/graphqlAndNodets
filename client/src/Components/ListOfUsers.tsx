import { GET_ALL_USER } from '../Graphql/Queries';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_USER } from '../Graphql/Mutation';

const ListOfUsers = () => {
  const { data, loading, error } = useQuery(GET_ALL_USER);

  const [deleteUser] = useMutation(DELETE_USER, {
    update(cache, { data: { deleteUser } }) {
      const existingUsers: any = cache.readQuery({ query: GET_ALL_USER });

      if (existingUsers && deleteUser) {
        const newUsers = existingUsers.getAllUsers.filter(
          (user: any) => user.id !== deleteUser.id
        );

        cache.writeQuery({
          query: GET_ALL_USER,
          data: { getAllUsers: newUsers },
        });
      }
    },
  });

  if (loading) return <p>Carregando usuários...</p>;
  if (error) return <p>Erro ao carregar usuários.</p>;

  return (
    <div className="bg-gray-100 p-6 max-w-2xl mx-auto my-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Lista de Usuários</h2>

      {data.getAllUsers.map((user: any) => (
        <div key={user.id} className="flex justify-between items-center p-4 bg-white shadow rounded mb-4">
          <div>
            <p className="text-lg text-gray-800">{user.name}</p>
            <p className="text-sm text-gray-600">{user.username}</p>
            <button
            className="bg-red-500 text-white text-xs px-2 py-2 rounded hover:bg-red-600 transition"
            onClick={() => deleteUser({ variables: { id: user.id } })}
          >
            Deletar
          </button>
          </div>
          
        </div>
      ))}
    </div>
  );
};

export default ListOfUsers;
