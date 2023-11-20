import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

export default () => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body:{
            name,email,password
        },
        onSuccess: () => Router.push('/')
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        doRequest();
    };

    return (
        <form className="my-form p-4" onSubmit={onSubmit}>
            <h1>Sign Up</h1>
            <div className="form-group mb-3">
                <label>Name</label>
                <input value={name}
                onChange={e  => setName(e.target.value)} 
                className="form-control" type="text" />
            </div>
            <div className="form-group mb-3">
                <label>Email Address</label>
                <input value={email}
                onChange={e  => setEmail(e.target.value)} 
                className="form-control" type="email"/>
            </div>
            <div className="form-group mb-3">
                <label>Password</label>
                <input 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="form-control" type="password"/>
            </div>
            {errors}
            <button className="btn btn-primary bg-primary">Sign Up</button>
        </form>
    );
};