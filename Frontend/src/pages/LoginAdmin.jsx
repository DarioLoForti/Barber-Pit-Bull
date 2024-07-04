import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function(){

    const { loginAdmin } = useAuth();

    const initialData = {
        email: '',
        password: ''
    };
    const [formData, setFormData] = useState(initialData);

    const [loginError, setLoginError] = useState(null);

    const handleLogin = async e => {
        e.preventDefault();
        try{
            await loginAdmin(formData);
            setFormData(initialData);
        }catch(err){
            setLoginError(err);
        }
    }

    const changeData = (key, value) => {
        setFormData(curr => ({
            ...curr,
            [key]: value
        }));
    }

    return(<>
    <div className="login">
        <h1>Login Admin</h1>
        <form onSubmit={handleLogin}>
        <label> Email </label>
            <input 
                type="text"
                placeholder="Email" 
                value={formData.email}
                onChange={e => changeData('email', e.target.value)}
            />
            <label> Password </label>
            <input 
                type="password"
                placeholder="Password" 
                value={formData.password}
                onChange={e => changeData('password', e.target.value)}
            />
            {loginError !== null && <div className="error">{loginError.message}</div>}
            {loginError?.errors && loginError.errors.map( (err, index) => (
                <div key={`err${index}`}>{err.msg}</div>
            ))}
            <button>Login</button>
        </form>

    </div>
    </>)

}