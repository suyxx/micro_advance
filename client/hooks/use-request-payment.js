import axios from 'axios';
import { useState } from 'react';

export default ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async (paymentToken) => {
    try {
      setErrors(null);
      
      // Include the payment token in the request body
      const requestBody = { ...body, token: paymentToken };

      const response = await axios[method](url, requestBody);

      if (onSuccess) {
        onSuccess(response.data);
      }

      return response.data;
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data && err.response.data.errors) {
        const errorsLength = err.response.data.errors.length;

        setErrors(
          <div className="alert alert-danger mb-3">
            <h4>Oops...</h4>
            <ul className="my-0">
              {err.response.data.errors.map((err) => (
                <li key={err.message}>{err.message}</li>
              ))}
            </ul>
          </div>
        );
      } else {
        console.error('Unexpected error structure:', err);
      }
    }
  };

  return { doRequest, errors };
};
