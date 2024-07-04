import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const urlWork = [
    {
        label: 'Works',
        href: '/works'
    },
    {
        label: 'Add Work',
        href: '/add-work'
    },
];

const urlUsers = [
    {
        label: 'users',
        href: '/users'
    },
    {
        label: 'Appuntamenti',
        href: '/appointments'
    }
];


export default function(){

const {isAdminIn, admin, logoutAdmin} = useAuth();

    return (<>
    <div className="dashboard-container">
    <h1 className="dash">My Dashboard</h1>

        <div className="dashboard">
    <div className="card">
            {admin.imageAdmin &&
                <figure>
                    <img src={admin.imageAdmin} alt={admin.name} />
                </figure>
            }
            <div className="admin">
                <h3>{admin.name && admin.name}</h3>
                <button onClick={logoutAdmin}>Logout</button>
            </div>
    </div>
    {/* <div className="card">
    {urlPhoto.map( ({label, href}, i) => (
            <h3 key={`urlPhoto${i}`}>
                <NavLink to={href}>{label}</NavLink>
            </h3>
        ))}
    </div>
    <div className="card">
    {urlCategories.map( ({label, href}, i) => (
            <h3 key={`urlCategories${i}`}>
                <NavLink to={href}>{label}</NavLink>
            </h3>
        ))}
    </div> */}
    <div className="card">
    {urlWork.map( ({label, href}, i) => (
            <h3 key={`urlWork${i}`}>
                <NavLink to={href}>{label}</NavLink>
            </h3>
        ))}
    </div>
    {urlUsers.map( ({label, href}, i) => (
    <div className="card">
            <h3 key={`urlUsers${i}`}>
                <NavLink to={href}>{label}</NavLink>
            </h3>
    </div>
        ))}
    
</div>
    </div>
    
        </>

        
    )
}