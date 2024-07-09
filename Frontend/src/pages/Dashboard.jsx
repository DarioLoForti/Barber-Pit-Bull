import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


const urlBooking = [
    {
        label: 'Bookings',
        href: '/my-bookings'
    }
];

const urlMessage = [
    {
        label: 'Messages',
        href: '/messages'
    }
];


export default function(){

const {isLoggedIn, logout, user} = useAuth();

    return (<>
    <div className="dashboard-container">
                    <div className="dashboard">
                        <div className="card">
                            {user.imageUrl &&
                                <figure>
                                    <img src={user.imageUrl} alt={user.name} />
                                </figure>
                            }
                            <div className="user">
                                <h3>{user.name && user.name}</h3>
                                <button onClick={logout}>Logout</button>
                            </div>
                        </div>
                        <div className="card">
                        {urlBooking.map( ({label, href}, i) => (
                                <h3 key={`urlBooking${i}`}>
                                    <NavLink to={href}>{label}</NavLink>
                                </h3>
                            ))}
                        </div>
                        <div className="card">
                        {urlMessage.map( ({label, href}, i) => (
                                <h3 key={`urlMessage${i}`}>
                                    <NavLink to={href}>{label}</NavLink>
                                </h3>
                            ))}
                        </div>
                        
                    </div>           
    </div>
    

</>)
}