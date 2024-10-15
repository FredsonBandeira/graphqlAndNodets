import React, { useState } from 'react';
import { UPDATE_PASSWORD } from '../Graphql/Mutation';
import { useMutation } from '@apollo/client';

const UpdatePassword = () => {
  const [username, setUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [updatePassword, { error }] = useMutation(UPDATE_PASSWORD);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto my-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Atualizar Senha</h2>

      <input
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
        type="text"
        placeholder="Username..."
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
        type="password"
        placeholder="Senha Atual"
        onChange={(event) => setCurrentPassword(event.target.value)}
      />
      <input
        className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
        type="password"
        placeholder="Nova Senha..."
        onChange={(event) => setNewPassword(event.target.value)}
      />

      <button
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        onClick={() => updatePassword({ variables: { username, oldPassword: currentPassword, newPassword } })}
      >
        Atualizar Senha
      </button>

      {error && <p className="text-red-500 mt-2">Erro ao atualizar a senha.</p>}
    </div>
  );
};

export default UpdatePassword;
