import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';

const ModifierBenef = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [iban, setIban] = useState('');
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { id } = useParams();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
        axios
            .get(`http://localhost:5555/beneficiaire/detailBenef/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Utilisez le token JWT stocké dans localStorage
                }
            })
            .then((response) => {
                const { firstName, lastName, iban } = response.data;
                setFirstName(firstName);
                setLastName(lastName);
                setIban(iban);
            })
            .catch((error) => {
                enqueueSnackbar('Une erreur s\'est produite lors du chargement des données', { variant: 'error' });
                console.log(error);
            });
        }
    }, [id, enqueueSnackbar]);

    const handleModifierBenef = () => {
        const data = {
            firstName,
            lastName,
            iban,
        };
        if (token) {
        axios
            .put(`http://localhost:5555/beneficiaire/modifierBenef/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}` // Utilisez le token JWT stocké dans localStorage
                }
            })
            .then(() => {
                enqueueSnackbar('Bénéficiaire modifié avec succès', { variant: 'success' });
                navigate('/beneficiaire');
            })
            .catch((error) => {
                enqueueSnackbar('Erreur lors de la modification du bénéficiaire', { variant: 'error' });
                console.log(error);
            });
        }
    };

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Modifier un bénéficiaire</h1>
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Nom</label>
                    <input
                        type='text'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Prénom</label>
                    <input
                        type='text'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2  w-full '
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>IBAN</label>
                    <input
                        type='text'
                        value={iban}
                        onChange={(e) => setIban(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2  w-full '
                    />
                </div>
                <button className='p-2 bg-sky-300 m-8' onClick={handleModifierBenef}>
                    Sauvegarder
                </button>
            </div>
        </div>
    );
};

export default ModifierBenef;