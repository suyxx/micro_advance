import axios from 'axios';
import { useState } from 'react';

export default({ url, method, body, onSuccess }) => {
    const [errors, setErrors] = useState(null);
    const doRequest = async () => {
        try{
            setErrors(null);
            const response = await axios[method](url, body);
            if(onSuccess){
                onSuccess(response.data);
            }
            return response.data;
        }catch(err){
            console.log(err);
            if (err.response && err.response.data && err.response.data.errors) {
                // Access the errors array and get its length
                const errorsLength = err.response.data.errors.length;
            
                // Now, you can use 'errorsLength' as needed
                setErrors(<div className="alert alert-danger mb-3">
                    <h4>Opps...</h4>
                    <ul className="my-0">
                        {err.response.data.errors.map(err => <li key={err.message}>{err.message}</li>)}
                    </ul>
                </div>);
              } else {
                // Handle the error in case the structure is different
                console.error('Unexpected error structure:', err);
              }
            
        }};

    return { doRequest, errors };
};