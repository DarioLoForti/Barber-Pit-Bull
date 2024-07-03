import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

export default function(){

    const { register } = useAuth();

    const initialData = {
        name: '',
        surname: '',
        phone: '',
        email: '',
        password: '',
        imageUrl: ''
    };
    const [formData, setFormData] = useState(initialData);

    const [signupError, setSignupError] = useState(null);

    const changeData = (key, value) => {
        setFormData(curr => ({
            ...curr,
            [key]: value
        }));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try{
            await register(formData);
            setFormData(initialData);
        }catch(err){
            setSignupError(err);
        }
    }

    return (
        
        <div className="register-container">
                <h1>Register</h1>
            <form onSubmit={handleSubmit} >
                    <label>Name</label>
                    <input 
                        type="text"
                        placeholder="Username" 
                        required
                        value={formData.name}
                        onChange={e => changeData('name', e.target.value)}/>

                    <label>Surname</label>
                    <input 
                        type="text"
                        placeholder="Surname" 
                        required
                        value={formData.surname}
                        onChange={e => changeData('surname', e.target.value)}/>

                    <label>Phone</label>
                    <input 
                        type="text"
                        placeholder="Phone" 
                        required
                        value={formData.phone}
                        onChange={e => changeData('phone', e.target.value)}/>
                    <label>Email</label>
                    <input 
                        type="text"
                        placeholder="Email" 
                        required
                        value={formData.email}
                        onChange={e => changeData('email', e.target.value)}/>
                
                    <label>Password</label>
                    <input 
                        type="password"
                        required
                        placeholder="Password" 
                        value={formData.password}
                        onChange={e => changeData('password', e.target.value)}/>
                
                    <label>Image Profile</label>
                    <input 
                    type="file"
                    onChange={e => changeData('imageUrl', e.target.files[0])}/>
            
                {signupError !== null && <div className="error">{signupError.message}</div>}
                {signupError?.errors && signupError.errors.map( (err, index) => (
                    <div key={`err${index}`}>{err.msg}</div>
                ))}
                <button>Register</button>
            </form>
        </div>
    )
}
