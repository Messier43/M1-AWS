import axios from 'axios';
import { format } from "date-fns";
import React, { useEffect, useState } from 'react';
import { MdOutlineAddBox } from 'react-icons/md';
import { Link } from 'react-router-dom';
import LogoutButton from '../../components/logoutButton';


const Solde = () => {
    const [soldes, setSolde] = useState([]);
    const [date, setDate] = useState('');
    const token = localStorage.getItem('token'); // Récupérer le token JWT du stockage local

    useEffect(() => {
        // Obtenez la date actuelle au format souhaité (par exemple, 'dd/MM/yyyy')
        const currentDate = format(new Date(), 'dd/MM/yyyy');
        setDate(currentDate);
        if (token) { // Vérifier si le token existe avant de faire la requête
            axios
                .get(`http://localhost:5555/solde/afficherSolde`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Inclure le token dans l'en-tête de la requête
                    },
                })
                .then((response) => {
                    setSolde(response.data.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []); // Exécuter l'effet uniquement lorsque le token change

    return (
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Solde au {date} </h1>
                <Link to='/ajouterSolde'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            <table className='w-full border-separate border-spacing-2'>
                <thead>
                    <tr>
                        <th className='border border-slate-600 rounded-md'>SOLDE</th>
                    </tr>
                </thead>
                <tbody>
                    {soldes.length === 0 ? (
                        <tr>
                            <td className='border border-slate-700 rounded-md text-center'>0</td>
                        </tr>
                    ) : (
                        soldes.map((solde, index) => (
                            <tr key={index} className='h-8'>
                                <td className='border border-slate-700 rounded-md text-center'>{solde.montant}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <LogoutButton />
        </div>
    );
};


export default Solde;