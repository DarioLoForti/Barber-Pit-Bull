// import axios from "../utils/axiosClient";
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import FormAdmin from "../components/FormAdmin";


// export default function EditAdmin() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [dataToEdit, setDataToEdit] = useState(null);

//     const fetchDataToEdit = async () => {
//         try {
//             const { data } = await axios.get(`/admin/${id}`);
//             setDataToEdit(data);
//         } catch (error) {
//             console.error("Error fetching admin data:", error);
//         }
//     };

//     useEffect(() => {
//         fetchDataToEdit();
//         return () => {
//             setDataToEdit(null);
//         };
//     }, [id]);

//     const editAdmin = async (formData) => {
//         try {
//             const res = await axios.put(`/admin/${id}`, formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//             });
            
//             if (res.status < 400) {
//                 navigate(`/dashboardAdmin`);
//             }
//         } catch (error) {
//             console.error("Error modifying admin:", error);
//         }
//     };
    

//     const handleBack = () => {
//         navigate('/dashboardAdmin');
//     };

//     return (
//         <div className="edit-admin">
//             <div className="back">
//                 <button onClick={handleBack}>Back</button>
//             </div>
//             {dataToEdit === null ? (
//                 <div>Loading...</div>
//             ) : (
//                 <>
//                     <h1>Edit Admin</h1>
//                     <FormAdmin initialData={dataToEdit} onSubmit={editAdmin} />
//                 </>
//             )}
//         </div>
//     );
// }
