import axios from 'axios';
import { CiLogout } from "react-icons/ci";

const LogoutButton = ({ destination = '/' }) => {
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:5555/auth/logout');
            localStorage.removeItem('token'); // Supprimer le token JWT du stockage local
            // Rediriger l'utilisateur vers la page spécifiée dans la propriété "destination" ou vers la page d'accueil par défaut
            window.location.href = destination;
        } catch (error) {
            console.error("Une erreur s'est produite lors de la déconnexion :", error);
        }
    };

    return (
        <div className='flex'>
            <button
                onClick={handleLogout}
                className='bg-red-800 text-white px-4 py-1 rounded-lg w-fit'
            >
                <CiLogout className='text-2xl' />
            </button>
        </div>
    );
};

export default LogoutButton;