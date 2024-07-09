import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { MdEditNote } from "react-icons/md";
import { Link } from "react-router-dom";


const urlWork = [
    { label: 'Works', href: '/works' },
    { label: 'Add Work', href: '/add-work' },
];

// const urlAdmin = [
//     { label: 'Edit Admin', href: '/admin/:id' },
// ];

const urlUsers = [
    { label: 'Users', href: '/users' },
    { label: 'Appuntamenti', href: '/appointments' },
];

export default function Dashboard() {
    const { isAdminIn, admin, logoutAdmin } = useAuth();

    return (
        <div className="dashboard-container">
            <div className="dashboard">
                <div className="card">
                    {admin.imageAdmin && (
                        <figure>
                            <img src={admin.imageAdmin} alt={admin.name} />
                        </figure>
                    )}
                    <div className="admin">
                        <h3>{admin.name && admin.name}</h3>
                        {/* <h4>
                            <Link to={`/admin/editAdmin`}>
                                Modifica <MdEditNote />
                            </Link>
                        </h4> */}
                        <button onClick={logoutAdmin}>Logout</button>
                    </div>
                </div>
                <div className="card">
                    {urlWork.map(({ label, href }, i) => (
                        <h3 key={`urlWork${i}`}>
                            <NavLink to={href}>{label}</NavLink>
                        </h3>
                    ))}
                </div>
                {/* <div className="card">
                    {urlAdmin.map(({ label, href }, i) => (
                        <h3 key={`urlAdmin${i}`}>
                            <NavLink to={href}>{label}</NavLink>
                        </h3>
                    ))}
                </div> */}
                <div className="card">
                    {urlUsers.map(({ label, href }, i) => (
                        <h3 key={`urlUsers${i}`}>
                            <NavLink to={href}>{label}</NavLink>
                        </h3>
                    ))}
                </div>
            </div>
        </div>
    );
}
