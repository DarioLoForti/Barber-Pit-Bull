import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function(){

    const { login } = useAuth();

    const initialData = {
        email: '',
        password: ''
    };
    const [formData, setFormData] = useState(initialData);

    const [loginError, setLoginError] = useState(null);

    const handleLogin = async e => {
        e.preventDefault();
        try{
            await login(formData);
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
        <h1>Login</h1>
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

        <div className="signIn">
            <h3>
            don't have an account? <Link to="/register">Register</Link>
            </h3>
        </div>
    </div>
    </>)

}