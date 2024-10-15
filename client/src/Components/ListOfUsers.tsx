import { GET_ALL_USER } from '../Graphql/Queries';
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_USER } from '../Graphql/Mutation';

const ListOfUsers = () => {
  const { data, loading, error } = useQuery(GET_ALL_USER);

  const [deleteUser] = useMutation(DELETE_USER, {
    update(cache, { data: { deleteUser } }) {
      // Atualize o cache removendo o usuário deletado
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
    <div>
      {data.getAllUsers.map((user: any) => (
        <div key={user.id}>
          {user.name} / {user.username}
          <button
            onClick={() => {
              deleteUser({ variables: { id: user.id } });
            }}
          >
            Delete User
          </button>
        </div>
      ))}
    </div>
  );
};

export default ListOfUsers;
