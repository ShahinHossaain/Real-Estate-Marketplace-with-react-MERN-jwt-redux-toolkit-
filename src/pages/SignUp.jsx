import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';

const SignOut = () => {
    const [formData, setFormData] = useState({})
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await fetch('api/auth/signup',
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(formData)
            }
        )
        const data = await res.json()
        if (data.success === false) {
            setError(data.message)
            setLoading(false);
            return;
        }
        setLoading(false)
        setError(null)
        navigate('/sign-in')
    }
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-center text-3xl font-semibold my-7'>Sign up</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username' onChange={handleChange} />
                <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange} />
                <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
                <button disabled={loading} className='bg-slate-700 py-3 rounded-lg text-white uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'loading...' : 'sign up'}</button>
                <OAuth />
            </form>
            <div className='flex gap-2 mt-5'>
                <p>Have an account?</p>
                <Link to={'/sign-in'}>
                    <span className='text-blue-700 font-semibold'>Sign in</span>
                </Link>
            </div>
            {error && <div className='text-red-600'>{error}</div>}
        </div>
    );
};

export default SignOut;