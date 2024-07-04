import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
// import { useAdmin } from "../contexts/AdminContext";    

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
        href: '/booked'
    },
    {
        label: 'Attestati',
        href: '/certificates'
    },
    {
        label: 'Admin',
        href: '/loginAdmin'
    }
]

export default function(){

const {isLoggedIn, logout, user, isAdminIn, logoutAdmin, admin} = useAuth();


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
                                {urlPages.map( ({label, href}, i) => (
                                    <li key={`urlPage${i}`}>
                                        <NavLink to={href}>{label}</NavLink>
                                    </li>
                                ))}
                                
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
                                    {isLoggedIn && (
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/dashboard">{user.name}</NavLink>
                                        </li>
                                    )}
                                {isLoggedIn &&
                                    <li>
                                        <NavLink to={`/dashboard`}>{user.name}</NavLink>
                                    </li>
                                }
                                {
                                    isAdminIn && (
                                        <li>
                                            <NavLink to="/dashboardAdmin">{admin.name}</NavLink>
                                        </li>
                                    )
                                }
                                
                                {/* {!isAdminIn&& <>
                                    <li>
                                        <NavLink to={`/loginAdmin`}>Login</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to={`/registerAdmin`}>Register</NavLink>
                                    </li>
                                </>}
                                {isAdminIn&&
                                    <li>
                                        <NavLink to={`/dashboardAdmin`}>{admin.name}</NavLink>
                                    </li>
                                } */}
                            </menu>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}


