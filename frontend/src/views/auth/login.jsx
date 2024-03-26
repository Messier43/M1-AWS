import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleLogin = () => {
        const data = {
            email,
            password
        };

        axios
            .post('http://localhost:5555/auth/login', data)
            .then((response) => {
                const { token } = response.data;
                localStorage.setItem('token', token); // Stockage du token JWT dans le localStorage
                enqueueSnackbar('Connexion réussie', { variant: 'success' });
                navigate('/beneficiaire');
            })
            .catch((error) => {
                enqueueSnackbar('Erreur lors de la connexion', { variant: 'error' });
                console.log(error);
            });
    };

    return (
        <div className='p-4'>
            <h1 className='text-3xl my-4'>Se connecter</h1>
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Email</label>
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Mot de passe</label>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <button className='p-2 bg-sky-300 m-8' onClick={handleLogin}>
                    Se connecter
                </button>
            </div>
        </div>
    );
}

export default Login;