import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import LogoutButton from '../../components/logoutButton';

const Beneficiaire = () => {
    const [benefs, setBenef] = useState([]);
    const token = localStorage.getItem('token'); // Récupérer le token JWT du stockage local

    useEffect(() => {
        if (token) { // Vérifier si le token existe avant de faire la requête
            axios
                .get(`http://localhost:5555/beneficiaire/afficherBenef`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Inclure le token dans l'en-tête de la requête
                    },
                })
                .then((response) => {
                    setBenef(response.data.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []); // Exécuter l'effet uniquement lorsque le token change

    return (
        <div className='p-4'>
            <div className='flex justify-between items-center'>
                <h1 className='text-3xl my-8'>Liste des bénéficiaires</h1>
                <Link to='/ajouterBenef'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            <table className='w-full border-separate border-spacing-2'>
                <thead>
                    <tr>
                        <th className='border border-slate-600 rounded-md'>No</th>
                        <th className='border border-slate-600 rounded-md'>Nom</th>
                        <th className='border border-slate-600 rounded-md'>Prénom</th>
                        <th className='border border-slate-600 rounded-md'>IBAN</th>
                        <th className='border border-slate-600 rounded-md'>ACTION</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {benefs.map((benef, index) => (
                        <tr key={benef._id} className='h-8'>
                            <td className='border border-slate-700 rounded-md text-center'>{index + 1}</td>
                            <td className='border border-slate-700 rounded-md text-center'>{benef.firstName}</td>
                            <td className='border border-slate-700 rounded-md text-center'>{benef.lastName}</td>
                            <td className='border border-slate-700 rounded-md text-center'>{benef.iban}</td>
                            <td className='border border-slate-700 rounded-md text-center'>
                                <div className='flex justify-center gap-x-4'>
                                    <Link to={`/detailBenef/${benef._id}`}>
                                        <BsInfoCircle className='text-2xl text-green-800' />
                                    </Link>
                                    <Link to={`/modifierBenef/${benef._id}`}>
                                        <AiOutlineEdit className='text-2xl text-yellow-600' />
                                    </Link>
                                    <Link to={`/supprimerBenef/${benef._id}`}>
                                        <MdOutlineDelete className='text-2xl text-red-600' />
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <LogoutButton/>
        </div>
    );
};

export default Beneficiaire;