import { useState, useEffect } from 'react';
import axios from '../utils/axiosClient';
import { Link, useNavigate } from "react-router-dom";

export default function Booking() {
    const initialData = {
        datetime: '',
        status: true,
        services: [],
    };

    const [formData, setFormData] = useState(initialData);
    const [services, setServices] = useState([]);
    const [bookingError, setBookingError] = useState(null);
    const [bookingSuccess, setBookingSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch available services
        const fetchServices = async () => {
            try {
                const { data } = await axios.get('/services');
                setServices(data.data);
            } catch (err) {
                console.error('Error fetching services:', err);
            }
        };

        fetchServices();
    }, []);

    
    const changeData = (key, value) => {
        setFormData(curr => ({
            ...curr,
            [key]: value
        }));
    };
    

    const handleServiceChange = (serviceId) => {
        setFormData(curr => {
            const newServices = curr.services.includes(serviceId)
                ? curr.services.filter(id => id !== serviceId)
                : [...curr.services, serviceId];
            return {
                ...curr,
                services: newServices,
            };
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        console.log('Data da inviare:', formData); // Controlla i dati che stai inviando

        try {
            await axios.post(`/appointments/`, formData);
            setFormData(initialData);
            setBookingSuccess('Prenotazione effettuata con successo!');
            setBookingError(null);
            navigate('/my-bookings');
        } catch (err) {
            console.error('Errore durante la prenotazione:', err);
            setBookingError(err.message || 'Errore durante la prenotazione');
            setBookingSuccess(null);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-center mb-5">Prenota un Servizio</h1>
                    <form onSubmit={handleSubmit}>
                    <div className="form-group">
                            <label>Data e Orario (dd/MM/yyyy HH:mm)</label>
                            <input 
                                type="text"
                                placeholder="Inserisci data e orario (dd/MM/yyyy HH:mm)"
                                required 
                                value={formData.datetime} 
                                onChange={e => changeData('datetime', e.target.value)} 
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Servizi</label>
                            <div>
                                {services.map(service => (
                                    <div key={service.id} className="form-check">
                                        <input
                                            type="checkbox"
                                            id={`service-${service.id}`}
                                            value={service.id}
                                            checked={formData.services.includes(service.id)}
                                            onChange={() => handleServiceChange(service.id)}
                                            className="form-check-input"
                                        />
                                        <label htmlFor={`service-${service.id}`} className="form-check-label">
                                            {service.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Status</label>
                            <input
                                type="checkbox"
                                checked={formData.status}
                                onChange={e => changeData('status', e.target.checked)}
                                className="form-control"
                            />
                        </div>
                        {bookingError && <div className="alert alert-danger">{bookingError}</div>}
                        {bookingSuccess && <div className="alert alert-success">{bookingSuccess}</div>}
                        <button type="submit" className="btn btn-primary">Prenota</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
