import { useState, useEffect } from 'react';
import { useGlobal } from '../contexts/GlobalContext';
import { useAuth } from '../contexts/AuthContext';

export default function ({initialData, onSubmit}) {
    const { isLoggedIn, user } = useAuth();
    const defaultData = initialData || {
        rating: '',
        comment: '',
        user: isLoggedIn ? user.name : ''
    }


    const [error, setError] = useState('');
    const [data, setData] = useState(defaultData);

    useEffect(() => {
        if (isLoggedIn) {
            setData(prevData => ({ ...prevData, user: user.name }));
        }
    }, [isLoggedIn, user]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit(data);
    }


    const changeData = (key, newValue) => {
        setData(data => ({...data, [key]: newValue}));
    }

    return (
        <>
        <div className="messag">
            <form onSubmit={handleSubmit} id="articleForm">
                <div className="top-form">
                    <div className='form-control'>
                        <label> User </label>
                        <input 
                            type="text"
                            placeholder='User Name'
                            value={data.user}
                            onChange={(e) => changeData('user', e.target.value)}
                        />
                    </div>
                    <div className='form-control'>
                        <label> Rating </label>
                        <input 
                            type="text"
                            placeholder='da 1 a 5. numeri interi'
                            value={data.rating}
                            onChange={(e) => changeData('rating', e.target.value)}
                        />
                    </div>
                </div>
                <div className="buttom-form">
                    <div className='form-text-area'>
                        <label> Comment </label>
                        <textarea
                            value={data.comment}
                            placeholder='Comment'
                            onChange={(e) => changeData('comment', e.target.value)}
                        />
                    </div>
                </div>
            
                    <button>Submit</button>
            </form>
            {error && <div className="error">{error}</div>}
        </div>
        </>
    )


}
        