import { useState } from 'react';


export default function ({initialData, onSubmit}) {

    const defaultData = initialData || {
        name: '',
        imagework: '',
    }


    const [error, setError] = useState('');
    const [data, setData] = useState(defaultData);


    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit(data);
    }


    const changeData = (key, newValue) => {
        setData(data => ({...data, [key]: newValue}));
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='form-control'>
                    <label> Name </label>
                    <input 
                        type="text"
                        value={data.name}
                        placeholder='Aggiungi un nome'
                        onChange={(e) => changeData('name', e.target.value)}
                    />
                </div>
                <div className='form-control'>
                    <label> Image </label>
                    <input 
                        type="file"
                        onChange={(e) => changeData('imageWork', e.target.files[0])}
                    />
                </div>                
                    <button>Submit</button>
            </form>
            {error && <div className="error">{error}</div>}
        </>
    )


}
        