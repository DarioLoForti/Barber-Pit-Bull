import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

export default function() {
    const { register } = useAuth();

    const initialData = {
        name: '',
        surname: '',
        phone: '',
        email: '',
        password: '',
        imageUrl: '',
        termsAccepted: false,
        privacyPolicyAccepted: false
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
        if (!formData.termsAccepted || !formData.privacyPolicyAccepted) {
            setSignupError({ message: 'Devi accettare i Termini di Servizio e la Privacy Policy.' });
            return;
        }
        try {
            await register(formData);
            setFormData(initialData);
        } catch (err) {
            setSignupError(err);
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="register-container">
                        <h1 className="text-center mb-5">Register</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="top-form">
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
                            </div>
                            <div className="main-form">
                                <label>Email</label>
                                <input 
                                    type="email"
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
                            </div>
                            <div className="bottom-form">
                                <label>Image Profile</label>
                                <input 
                                    type="file"
                                    onChange={e => changeData('imageUrl', e.target.files[0])}/>
                            </div>
                            
                            <div className="checkbox-container">
                                <input 
                                    type="checkbox"
                                    name="termsAccepted"
                                    checked={formData.termsAccepted}
                                    onChange={e => changeData('termsAccepted', e.target.checked)}/>
                                <label>Accetto i <a href="/terms-of-service" target="_blank">Termini di Servizio</a></label>
                            </div>

                            <div className="checkbox-container">
                                <input 
                                    type="checkbox"
                                    name="privacyPolicyAccepted"
                                    checked={formData.privacyPolicyAccepted}
                                    onChange={e => changeData('privacyPolicyAccepted', e.target.checked)}/>
                                <label>Accetto la <a href="/privacy-policy" target="_blank">Privacy Policy</a></label>
                            </div>

                            {signupError !== null && <div className="error">{signupError.message}</div>}
                            {signupError?.errors && signupError.errors.map((err, index) => (
                                <div key={`err${index}`}>{err.msg}</div>
                            ))}
                            <button>Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
