import { useState, useEffect } from 'react';
import axios from '../utils/axiosClient';
import { useAuth } from '../contexts/AuthContext';

export default function Appointments() {
    const { isLoggedIn, user } = useAuth();
    const [appointments, setAppointments] = useState(null);
    const [date, setDate] = useState(null);
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

    const fetchAppointments = async () => {
        const { data: array } = await axios.get(`/admin/appointments?date=${date}`);
        const formattedAppointments = array.data.map((appointment) => ({
            ...appointment,
            formattedDatetime: formatDatetime(appointment.datetime),
        }));
        // Ordina gli appuntamenti in ordine cronologico per orario
        formattedAppointments.sort((a, b) => {
            const timeA = new Date(a.datetime).getTime();
            const timeB = new Date(b.datetime).getTime();
            return timeA - timeB;
        });
        setAppointments(formattedAppointments);
    };

    const formatDatetime = (datetime) => {
        const dateObj = new Date(datetime);
        const formattedDate = `${dateObj.getDate()}-${dateObj.getMonth() + 1}-${dateObj.getFullYear()}T${formatTime(dateObj.getHours())}:${formatTime(dateObj.getMinutes())}`;
        return formattedDate;
    };

    const formatTime = (time) => {
        return time < 10 ? `0${time}` : `${time}`;
    };

    const handleBack = () => {
        navigate("/dashboardAdmin");
    };

    useEffect(() => {
        if (date) {
            fetchAppointments();
        }
    }, [date]);

    return (
        <>
            <div className="appointments">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className="text-center mb-4">Appuntamenti</h1>
                        </div>
                    </div>
                    <div className="col-2">
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="form-control mb-4"
                        />
                    </div>
                    <div className="row">
                        {appointments ? (
                            appointments.map((a) => (
                                <div key={`a${a.id}`} className="col-3">
                                    <div className="card">
                                        <h3>{a.formattedDatetime}</h3>
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                {a.user.name}
                                            </h5>
                                            <h5 className="card-title">
                                                {a.user.surname}
                                            </h5>
                                            <p className="card-text">
                                                {a.user.phone}
                                            </p>
                                        </div>
                                        <div className="card-body">
                                            {a.services ? (
                                                a.services.map((s) => (
                                                    <div key={`s${s.id}`}>
                                                        <h5 className="card-title">
                                                            {s.name}
                                                        </h5>
                                                        <h5 className="card-title">
                                                            {s.price} Euro
                                                        </h5>
                                                        <p className="card-text">
                                                            {s.duration} minuti
                                                        </p>
                                                    </div>
                                                ))
                                            ) : (
                                                <p>Loading services...</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Loading appointments...</p>
                        )}
                        <div className="col-12 mt-5">
                            <div className="back">
                                <button onClick={handleBack}>Back</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
