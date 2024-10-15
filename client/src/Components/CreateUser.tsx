import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { CREATE_USER } from '../Graphql/Mutation';

const CreateUser = () => {
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [createUser, { error }] = useMutation(CREATE_USER);

    return (
        <div className='bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto my-8'>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Criar Novo Usuário</h2>
            <div className='createUser'>
                <input
                className='w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300'
                    type="text"
                    placeholder='name'
                    onChangeCapture={(event) => {
                        const target = event.target as HTMLInputElement;
                        setName(target.value);
                    }}
                />
                <input
                className='w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300'
                    type="text"
                    placeholder='username'
                    onChangeCapture={(event) => {
                        const target = event.target as HTMLInputElement;
                        setUserName(target.value);
                    }}
                />
                <input
                className='w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300'
                    type="text"
                    placeholder='password'
                    onChangeCapture={(event) => {
                        const target = event.target as HTMLInputElement;
                        setPassword(target.value);
                    }}
                />
                <button
                className='w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition'
                    onClick={() => {
                        createUser({
                            variables: { name: name, username: userName, password: password },
                        });
                    }}
                >
                    Create User
                </button>
            </div>
        </div>
    );
};

export default CreateUser;
