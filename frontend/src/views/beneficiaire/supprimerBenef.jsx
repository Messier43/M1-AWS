import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';

const SupprimerBenef = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            enqueueSnackbar('Vous devez être connecté pour effectuer cette action', { variant: 'error' });
            navigate('/login'); // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
        }
    }, [enqueueSnackbar, navigate]);

    const handleSupprimerBenef = () => {
        if (token) {
        axios
            .delete(`http://localhost:5555/beneficiaire/supprimerBenef/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}` // Utilisez le token JWT stocké dans localStorage
                }
            })
            .then(() => {
                enqueueSnackbar('Bénéficiaire supprimé avec succès', { variant: 'success' });
                navigate('/beneficiaire');
            })
            .catch((error) => {
                enqueueSnackbar('Erreur lors de la suppression du bénéficiaire', { variant: 'error' });
                console.log(error);
            });
        }
    };

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Supprimer bénéficiaire</h1>
            <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
                <h3 className='text-2xl'>Voulez-vous supprimer ce bénéficiaire ?</h3>

                <button
                    className='p-4 bg-red-600 text-white m-8 w-full'
                    onClick={handleSupprimerBenef}
                >
                    Oui, supprimer
                </button>
            </div>
        </div>
    );
};

export default SupprimerBenef;