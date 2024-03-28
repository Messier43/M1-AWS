import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AjouterSolde = () => {
    const [montant, setMontant] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();


    const handleAjouterSolde = () => {
        const token = localStorage.getItem('token'); // Récupérer le token JWT du stockage local

        const data = {
            montant,
        }
        if (token) {
        axios
            .put('http://localhost:5555/solde/ajouterSolde', data, {
                headers: {
                    Authorization: `Bearer ${token}`, // Inclure le token dans l'en-tête de la requête
                },
            })
            .then(() => {
                enqueueSnackbar('Solde ajouté avec succès', { variant: 'success' });
                navigate('/solde');
            })
            .catch((error) => {
                enqueueSnackbar('Erreur lors de l\'ajout du solde', { variant: 'error' });
                console.log(error);
            });
        }
    };
    return (
        <div className='p-4'>
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>SOLDE</label>
                    <input
                        type='number'
                        value={montant}
                        onChange={(e) => setMontant(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <button className='p-2 bg-sky-300 m-8' onClick={handleAjouterSolde}>
                    Sauvegarder
                </button>
            </div>
        </div>
    );
};

export default AjouterSolde