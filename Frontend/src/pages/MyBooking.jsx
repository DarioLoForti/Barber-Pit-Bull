import { useState, useEffect } from 'react';
import axios from '../utils/axiosClient';
import { useAuth } from '../contexts/AuthContext';

export default function MyBookings() {
    const [bookings, setBookings] = useState(null);
    const { user } = useAuth();

    const fetchBookings = async () => {
        try {
            const { data } = await axios.get(`/appointments`);
            setBookings(data.data);
        } catch (err) {
            console.error('Errore nel recuperare le prenotazioni', err);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    // Filtra le prenotazioni per il mese corrente
    const filterBookingsByCurrentMonth = () => {
        if (!bookings) return [];
        
        const currentMonth = new Date().getMonth() + 1; // Month is zero-indexed, so add 1
        return bookings.filter(booking => {
            const bookingMonth = new Date(booking.datetime).getMonth() + 1;
            return bookingMonth === currentMonth;
        });
    };

    const filteredBookings = filterBookingsByCurrentMonth();

    return (
        <div className="container">
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                    <h1 className="text-center mb-4">Le Mie Prenotazioni di Questo Mese</h1>
                    {filteredBookings.length > 0 ? (
                        filteredBookings.map((booking) => (
                            <div key={booking.id} className="card mb-3">
                                <div className="card-body">
                                    <h5 className="card-title">Servizi: {booking.services.map(service => service.name).join(', ')}</h5>
                                    <p className="card-text">Data e Orario: {new Date(booking.datetime).toLocaleString()}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Nessuna prenotazione trovata per questo mese.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
