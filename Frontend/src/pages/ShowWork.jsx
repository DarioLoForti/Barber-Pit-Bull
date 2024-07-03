import React, { useEffect, useState } from "react";
import axios from "../utils/axiosClient";
import { MdDelete, MdEditNote } from "react-icons/md";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

export default function Work() {
    const { id } = useParams();
    const [work, setWork] = useState(null);
    const [fullscreen, setFullscreen] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // Stato per gestire la visualizzazione del dialogo di conferma

    const fetchWork = async () => {
        try {
            const { data } = await axios.get(`/works/${id}`);
            setWork(data);
        } catch (error) {
            console.error("Error fetching work:", error);
        }
    };

    const navigate = useNavigate();

    const deleteWork = async (id) => {
        try {
            await axios.delete(`/works/${id}`);
            navigate('/works');
        } catch (error) {
            console.error("Error deleting work:", error);
        }
    };

    useEffect(() => {
        fetchWork();
    }, [id]);

    const handleBack = () => {
         navigate('/works');
    };

    const toggleFullscreen = () => {
        setFullscreen(!fullscreen);
    };

    const handleDeleteClick = () => {
        setShowDeleteConfirm(true); // Mostra il dialogo di conferma prima di eliminare
    };

    const confirmDelete = async () => {
        await deleteWork(work.id);
        setShowDeleteConfirm(false); // Nasconde il dialogo di conferma dopo aver eliminato
    };

    const cancelDelete = () => {
        setShowDeleteConfirm(false); // Nasconde il dialogo di conferma senza eliminare
    };

    return (
        <>
            {work === null ? (
                <span>Loading...</span>
            ) : (
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="work">
                                <div className="back">
                                <button onClick={handleBack}>Back</button>
                                </div>
                                <div className="card-work">
                                    <div className="top-card">
                                        <h4>
                                            <Link to={`/works/${id}/edit`}>
                                                Modifica <MdEditNote />
                                            </Link>
                                        </h4>
                                        <h4 onClick={handleDeleteClick}>Elimina <MdDelete /></h4>
                                    </div>
                                    {/* Gestione dell'immagine a schermo intero */}
                                    {fullscreen && (
                                        <div className="fullscreen-overlay" onClick={toggleFullscreen}>
                                            <img src={work.imageWork} alt={work.name} className="fullscreen-image" />
                                        </div>
                                    )}
                                    {!fullscreen && (
                                        <img src={work.imageWork} alt={work.name} onClick={toggleFullscreen} />
                                    )}
                                    <h1>{work.name}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Componente del dialogo di conferma */}
            {showDeleteConfirm && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Sei sicuro di voler eliminare questa foto?</p>
                        <div className="btn"> 
                            <button onClick={confirmDelete}>Conferma</button>
                            <button onClick={cancelDelete}>Annulla</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
