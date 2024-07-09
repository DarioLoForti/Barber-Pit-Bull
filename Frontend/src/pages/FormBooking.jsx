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
    const [availableSlots, setAvailableSlots] = useState([]);
    const [serviceDurations, setServiceDurations] = useState({});
    const [totalDuration, setTotalDuration] = useState(0);
    const [bookingError, setBookingError] = useState(null);
    const [bookingSuccess, setBookingSuccess] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const { data } = await axios.get('/services');
                setServices(data.data);
                const durations = data.data.reduce((acc, service) => {
                    acc[service.id] = service.duration;
                    return acc;
                }, {});
                setServiceDurations(durations);
            } catch (err) {
                console.error('Errore nel recuperare i servizi:', err);
            }
        };

        fetchServices();
    }, []);

    useEffect(() => {
        const fetchAvailableSlots = async (date, duration) => {
            try {
                console.log('Fetching available slots for date:', date, 'and duration:', duration);
                const { data } = await axios.get(`/appointments/availability?date=${date}&duration=${duration}`);
                console.log('Slot disponibili:', data.slots);
                const filteredSlots = data.slots.filter(slot => slot.available);
                setAvailableSlots(filteredSlots);
            } catch (err) {
                console.error('Errore nel recuperare le fasce orarie disponibili:', err);
            }
        };

        if (formData.datetime && totalDuration > 0) {
            const date = formData.datetime.split('T')[0];
            fetchAvailableSlots(date, totalDuration);
        }
    }, [formData.datetime, totalDuration]);

    const changeData = (key, value) => {
        setFormData(curr => {
            console.log(`Updating ${key} to ${value}`);
            return {
                ...curr,
                [key]: value
            };
        });
    };

    const handleServiceChange = (serviceId) => {
        setFormData(curr => {
            const newServices = curr.services.includes(serviceId)
                ? curr.services.filter(id => id !== serviceId)
                : [...curr.services, serviceId];

            const newTotalDuration = newServices.reduce((total, id) => total + (serviceDurations[id] || 0), 0);
            setTotalDuration(newTotalDuration);

            console.log('Updated services:', newServices);
            console.log('Updated total duration:', newTotalDuration);

            return {
                ...curr,
                services: newServices,
            };
        });
    };

    const formatDatetime = (datetime) => {
        const [datePart, timePart] = datetime.split('T');
        const [year, month, day] = datePart.split('-');
        return `${day}/${month}/${year} ${timePart}`;
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const formattedData = {
            ...formData,
            datetime: formatDatetime(formData.datetime),
        };
        console.log('Submitting form with data:', formattedData);
        try {
            await axios.post('/appointments', formattedData);
            setFormData(initialData);
            setBookingSuccess('Prenotazione effettuata con successo!');
            setBookingError(null);
            navigate('/my-bookings');
        } catch (err) {
            setBookingError(err.response.data.error || 'Errore durante la prenotazione');
            setBookingSuccess(null);
            console.error('Errore nella richiesta di prenotazione:', err.response.data);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1 className="text-center mb-5">Prenota un Servizio</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Data e Orario</label>
                            <input 
                                type="datetime-local" 
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
                                            {service.name} (Durata: {service.duration} minuti)
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Orari Disponibili</label>
                            <select 
                                required 
                                value={formData.datetime.split('T')[1] || ''} 
                                onChange={e => {
                                    const datePart = formData.datetime.split('T')[0];
                                    const timePart = e.target.value;
                                    const newDatetime = `${datePart}T${timePart}`;
                                    changeData('datetime', newDatetime);
                                }} 
                                className="form-control"
                            >
                                <option value="">Seleziona un orario</option>
                                {availableSlots.length === 0 && <option disabled>Nessun orario disponibile</option>}
                                {availableSlots.map(slot => (
                                    <option key={slot.time} value={slot.time}>{slot.time}</option>
                                ))}
                            </select>
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
