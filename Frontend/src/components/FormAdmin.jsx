// import { useState } from 'react';

// export default function FormAdmin({ initialData, onSubmit }) {
//     const [data, setData] = useState(initialData);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('name', data.name);
//         formData.append('surname', data.surname);
//         formData.append('phone', data.phone);
//         formData.append('email', data.email);
//         formData.append('password', data.password);
//         if (data.imageAdmin) {
//             formData.append('imageAdmin', data.imageAdmin);
//         }
//         onSubmit(formData);
//     };

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         if (name === 'imageAdmin') {
//             setData((prevData) => ({
//                 ...prevData,
//                 [name]: files[0],
//             }));
//         } else {
//             setData((prevData) => ({
//                 ...prevData,
//                 [name]: value,
//             }));
//         }
//     };

//     return (
//         <>
//             <form onSubmit={handleSubmit}>
//                 {/* Input fields for name, surname, email, phone, password, imageAdmin */}
//             </form>
//         </>
//     );
// }
