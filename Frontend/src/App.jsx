import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import DefaultLayout from "./layouts/DefaultLayout";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LoginAdmin from "./pages/LoginAdmin";
// import Photos from "./pages/Photos";
// import PrivateLayout from "./layouts/PrivateLayout";
import Dashboard from "./pages/Dashboard";
import DashboardAdmin from "./pages/DashboardAdmin";
import ProtectPage from "./middlewares/ProtectPage";
import AdminPage from "./middlewares/AdminPage";
import Work from "./pages/Work";
import Certificate from "./pages/Certificate";
import ShowWork from "./pages/ShowWork";
import Users from "./pages/Users";
import Appointments from "./pages/Appointments";
// import AddPhoto from "./pages/AddPhoto";
// import EditPhoto from "./pages/EditPhoto";
// import Categories from "./pages/Categories";
// import AddCategory from "./pages/AddCategory";
// import AddMessage from "./pages/AddMessage";
// import Messages from "./pages/Messages";



export default function(){

    return (
      <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route path="*" element={<NotFound/>}/>
                        <Route index element={<Home/>} />
                        <Route path="loginAdmin" element={<LoginAdmin/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="register" element={<Register/>}/>
                        <Route path="works" element={<Work/>}/>
                        <Route path="works/:id" element={<ShowWork/>}/>
                        <Route path="certificates" element={<Certificate/>}/>
                        
                </Route>

               {/* Public */}
               {/* <Route path="/" element={<DefaultLayout />}>
                    <Route path="*" element={<NotFound/>}/>
                        <Route index element={<Home/>} />
                        <Route path="photos" element={<Photos/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="register" element={<Register/>}/>
                        <Route path="create-message" element={<AddMessage/>}/>
                </Route> */}

                {/* Private */}
                <Route path="/" element={
                    <ProtectPage>
                    <DefaultLayout />
                    </ProtectPage>
                    }>
                      {/* <Route path="messages" element={<Messages/>}/> */}
                        <Route path="dashboard" element={<Dashboard />} />
                    {/* <Route path="photos">
                            <Route path=":id" element={<ShowPhoto/>}/>
                            <Route path=":id/edit" element={<EditPhoto/>}/>
                   </Route>
                   <Route path="create-photo" element={<AddPhoto/>}/>
                   <Route path="categories">
                            <Route index element={<Categories/>} />
                            <Route path=":id" element={<ShowPhoto/>}/>
                            <Route path=":id/edit" element={<EditPhoto/>}/>
                   </Route>
                    <Route path="create-category" element={<AddCategory/>}/> */}
                </Route>

                <Route path="/" element={
                    <AdminPage>
                    <DefaultLayout />
                    </AdminPage>
                    }>
                      {/* <Route path="messages" element={<Messages/>}/> */}
                        <Route path="dashboardAdmin" element={<DashboardAdmin />} />
                        <Route path="users" element={<Users />} />
                        <Route path="appointments" element={<Appointments />} />
                </Route>

      </Routes>
    )

} 