import axios from 'axios';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';


const SupprimerBenef = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();

    const SupprimerBenef = () => {
        axios
            .delete(`http://localhost:5555/beneficiaire/supprimerBenef/${id}`)
            .then(() => {
                setLoading(false);
                enqueueSnackbar('bénéficiaire supprimé avec succès', { variant: 'success' });
                navigate('/beneficiaire');
            })
            .catch((error) => {
                alert('An error happened. Please Chack console');
                enqueueSnackbar('Error', { variant: 'error' });
                console.log(error);
            });
    };

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Supprimer bénéficiaire</h1>
            <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
                <h3 className='text-2xl'>Voulez-vous supprimer ce bénéficiaire ?</h3>

                <button
                    className='p-4 bg-red-600 text-white m-8 w-full'
                    onClick={SupprimerBenef}
                >
                    oui, supprimer
                </button>
            </div>
        </div>
    )
}

export default SupprimerBenef