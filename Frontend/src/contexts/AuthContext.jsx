import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStorage from "../hooks/useStorage";
import axios from "../utils/axiosClient";

const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const navigate = useNavigate();

    const [user, setUser] = useStorage(null, 'user');
    const [admin, setAdmin] = useStorage(null, 'admin');

    const isLoggedIn = user !== null;
    const isAdminIn = admin !== null;

    const login = async (payload) => {
        try{
            const { data: response } = await axios.post('/users/login', payload);
            setUser(response.data);
            localStorage.setItem('accessToken', response.token);
            navigate('/dashboard');
        }catch(err){
            const { errors } = err.response.data;
            const error = new Error(errors ? 'Error Login' : err.response.data);
            error.errors = errors;
            throw error;
        }
    }

    const loginAdmin = async (payload) => {
        try{
            const { data: response } = await axios.post('/admin/login', payload);
            setAdmin(response.data);
            localStorage.setItem('accessToken', response.token);
            navigate('/dashboardAdmin');
        }catch(err){
            const { errors } = err.response.data;
            const error = new Error(errors ? 'Error Login' : err.response.data);
            error.errors = errors;
            throw error;
        }
    }

    const register = async (payload) => {
        try{
            if(!payload.name) delete payload.name;
            if(!payload.surname) delete payload.surname;
            if(!payload.phone) delete payload.phone;
            if(!payload.profileUrl) delete payload.profileUrl;
            const { data: response } = await axios.post('/users/register', payload, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            setUser(response.data);
            localStorage.setItem('accessToken', response.token);
            navigate('/login');
        }catch(err){
            const { errors } = err.response.data;
            const error = new Error(errors ? 'Error Register' : err.response.data);
            error.errors = errors;
            throw error;
        }
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('accessToken');
        navigate('/login');
    }

    const logoutAdmin = () => {
        setAdmin(null);
        localStorage.removeItem('accessToken');
        navigate('/loginAdmin');
    }

    const value = {
        isLoggedIn,
        isAdminIn,
        login,
        loginAdmin,
        logout,
        logoutAdmin,
        user,
        admin,
        register
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const value = useContext(AuthContext);
    if(value === undefined){
        throw new Error('Non sei dentro al Auth Provider.');
    }
    return value;
}

export {AuthProvider, useAuth};