import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from './AppContext'

function Register() {
    const navigate = useNavigate();
    const { users, setUsers } = useContext(AppContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const handleRegister = () => {
        const normalizedEmail = email.trim().toLowerCase()

        if (!name || !normalizedEmail || !password) {
            alert('Please complete all fields');
            return;
        }

        const existingEmail = users.find((user) => user.email.toLowerCase() === normalizedEmail)
        if (existingEmail) {
            alert('Email already exists');
            return;
        }

        const newUser = { name, email: normalizedEmail, password, trainings: [], admin: isAdmin };

        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => {
                setUsers((prev) => [...prev, data]);
                alert('Registration successful');
                navigate('/');
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl flex flex-col gap-5 transition-all duration-300 hover:border-white/20">
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 text-center mb-2 tracking-wide">Register</h2>

            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-5 py-3.5 text-white placeholder-slate-400 outline-none transition-all duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-base"
            />

            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-5 py-3.5 text-white placeholder-slate-400 outline-none transition-all duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-base"
            />

            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-5 py-3.5 text-white placeholder-slate-400 outline-none transition-all duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-base"
            />

            {users.filter(user => user.admin).length === 0 && (


                <div>
                    <p
                        className="text-sm text-slate-400"
                    >
                        Are you an admin?
                    </p>
                    <input
                        type="checkbox"
                        checked={isAdmin}
                        onChange={(e) => setIsAdmin(e.target.checked)}
                    />
                </div>
            )}



            <button
                onClick={handleRegister}
                className="w-full mt-2 bg-gradient-to-r from-pink-500 via-purple-600 to-cyan-500 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 active:scale-[0.98] transition-all duration-200 cursor-pointer text-center"
            >Register</button>

            <div className="flex items-center justify-between gap-4 mt-2">

                <span className="text-sm text-slate-400">Already have an account?</span>

                <button
                    onClick={() => navigate('/')}
                    className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors duration-200 cursor-pointer bg-transparent border-none p-0 outline-none"
                >
                    Back to Login

                </button>

            </div>

        </div>
    )
}

export default Register
