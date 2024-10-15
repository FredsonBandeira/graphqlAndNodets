import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { CREATE_USER } from '../Graphql/Mutation';

const CreateUser = () => {
    const [name, setName] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [createUser, { error }] = useMutation(CREATE_USER);

    return (
        <div className='createUser'>
            <input
                type="text"
                placeholder='name'
                onChangeCapture={(event) => {
                    const target = event.target as HTMLInputElement;
                    setName(target.value);
                }}
            />
            <input
                type="text"
                placeholder='username'
                onChangeCapture={(event) => {
                    const target = event.target as HTMLInputElement;
                    setUserName(target.value);
                }}
            />
            <input
                type="text"
                placeholder='password'
                onChangeCapture={(event) => {
                    const target = event.target as HTMLInputElement;
                    setPassword(target.value);
                }}
            />
            <button
                onClick={() => {
                    createUser({
                        variables: { name: name, username: userName, password: password },
                    });
                }}
            >
                Create User
            </button>
        </div>
    );
};

export default CreateUser;
