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

    // Filtra le prenotazioni per il mese corrente e le ordina per data e ora
    const filterAndSortBookingsByCurrentMonth = () => {
        if (!bookings) return [];
        
        const currentMonth = new Date().getMonth() + 1; // Month is zero-indexed, so add 1
        const filteredBookings = bookings.filter(booking => {
            const bookingMonth = new Date(booking.datetime).getMonth() + 1;
            return bookingMonth === currentMonth;
        });

        // Ordina le prenotazioni per data e ora
        filteredBookings.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

        return filteredBookings;
    };

    const filteredAndSortedBookings = filterAndSortBookingsByCurrentMonth();

    return (
        <div className="container">
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                    <h1 className="text-center mb-4">Le Mie Prenotazioni di Questo Mese</h1>
                    {filteredAndSortedBookings.length > 0 ? (
                        filteredAndSortedBookings.map((booking) => (
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
