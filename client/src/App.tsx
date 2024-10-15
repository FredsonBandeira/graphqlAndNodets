import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import './App.css';
import CreateUser from './Components/CreateUser';
import ListOfUsers from './Components/ListOfUsers';
import UpdatePassword from './Components/UpdatePassword';

function App() {
  const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql',
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <div className="min-h-screen bg-slate-700 p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-700">Gestão de Usuários</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CreateUser />
          <UpdatePassword />
        </div>

        <ListOfUsers />
      </div>
    </ApolloProvider>
  );
}

export default App;
