// import { createContext, useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import useStorage from "../hooks/useStorage";
// import axios from "../utils/axiosClient";

// const AuthAdminContext = createContext();

// const AuthProvider = ({ children }) => {
//     const navigate = useNavigate();

//     const [admin, setAdmin] = useStorage(null, 'admin'); // Gestione dello stato per l'admin
//     const isAdminIn = admin !== null;

//     const loginAdmin = async (payload) => {
//         try {
//             const { data: response } = await axios.post('/admins/login', payload);
//             setAdmin(response.data); // Salva i dati dell'admin nello storage
//             localStorage.setItem('accessToken', response.token);
//             navigate('/');
//         } catch (err) {
//             const { errors } = err.response.data;
//             const error = new Error(errors ? 'Errore durante il login' : err.response.data);
//             error.errors = errors;
//             throw error;
//         }
//     };

//     const logoutAdmin = () => {
//         setAdmin(null); // Rimuove i dati dell'admin dallo storage
//         localStorage.removeItem('accessToken');
//         navigate('/login');
//     };

//     const value = {
//         isAdminIn,
//         loginAdmin,
//         logoutAdmin,
//         admin,
//     };

//     return (
//         <AuthAdminContext.Provider value={value}>
//             {children}
//         </AuthAdminContext.Provider>
//     );
// };

// const useAdmin = () => {
//     const value = useContext(AuthContext);
//     if (value === undefined) {
//         throw new Error('Non sei dentro al Auth Provider.');
//     }
//     return value;
// };

// export { AuthProvider, useAdmin };
