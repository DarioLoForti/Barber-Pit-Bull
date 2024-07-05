import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const urlPages = [
    {
        label: 'Home',
        href: '/'
    },
    {
        label: 'Lavori',
        href: '/works'
    },
    {
        label: 'Prenotati',
        href: '/form-booking'
    },
    {
        label: 'Attestati',
        href: '/certificates'
    }
];

const adminLinks = [
    {
        label: 'Admin',
        href: '/loginAdmin'
    }
];

export default function Header() {
    const { isLoggedIn, logout, user, isAdminIn, logoutAdmin, admin } = useAuth();

    return (
        <header>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <nav className="navbar">
                            <menu>
                                <li>
                                    <img src="../../public/logo/Logo.png" alt="logo" />
                                </li>
                                {/* Links for regular users */}
                                {urlPages.map(({ label, href }, i) => (
                                    <li key={`urlPage${i}`}>
                                        <NavLink to={href}>{label}</NavLink>
                                    </li>
                                ))}


                                {/* User dropdown menu */}
                                {!isLoggedIn && (
                                    <div className="btn-group dropend">
                                        <button type="button" className="btn btn-sm btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                            User
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><NavLink className="dropdown-item" to="/login">Login</NavLink></li>
                                        </ul>
                                    </div>
                                )}

                                {/* Logged-in user link */}
                                {isLoggedIn && (
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/dashboard">{user.name}</NavLink>
                                    </li>
                                )}

                                {/* Admin link to dashboard */}
                                {isAdminIn && (
                                    <li>
                                        <NavLink to="/dashboardAdmin">{admin.name}</NavLink>
                                    </li>
                                )}

                                {/* Admin login link (only visible when not logged in) */}
                                {!isAdminIn && !isLoggedIn && (
                                    <li>
                                        <NavLink to="/loginAdmin">Admin Login</NavLink>
                                    </li>
                                )}
                            </menu>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}
