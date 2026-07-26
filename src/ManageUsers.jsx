import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from './AppContext';

function ManageUsers() {
    const navigate = useNavigate();
    const { users, setUsers } = useContext(AppContext);

    const handleToggleMaster = (user) => {
        const updatedUser = { ...user, master: !user.master };

        fetch(`http://localhost:3000/users/${user._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUser)
        })
            .then(res => res.json())
            .then(data => {
                setUsers(prevUsers => prevUsers.map(u => u._id === user._id ? data : u));
            })
            .catch(err => console.log('Error updating master status:', err));
    };

    return (
        <div className="w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <button
                    onClick={() => navigate('/myTraining')}
                    className="bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 hover:from-cyan-500 hover:via-sky-600 hover:to-blue-700 text-white font-extrabold py-2.5 px-5 rounded-xl shadow-[0_0_15px_rgba(14,165,233,0.5)] hover:shadow-[0_0_25px_rgba(14,165,233,0.8)] ring-2 ring-sky-300/70 animate-pulse-slow transform hover:scale-110 active:scale-95 transition-all duration-300 ease-in-out mb-4 tracking-wide uppercase"
                >
                    Back
                </button>
                <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 tracking-wide">
                    Manage Users
                </h2>
            </div>
            <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2">
                {users.filter(user => !user.admin).map(user => (
                    <div
                        key={user._id}
                        className="bg-slate-900/50 border border-slate-700 rounded-xl p-4 flex items-center justify-between gap-4 transition-all duration-200 hover:border-slate-600"
                    >
                        <div>
                            <p className="text-white font-semibold text-lg">{user.name}</p>
                            <p className="text-slate-400 text-sm">{user.email}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-slate-300 font-medium">Is a Master?</span>
                            <input
                                type="checkbox"
                                checked={user.master || false}
                                onChange={() => handleToggleMaster(user)}
                                className="w-5 h-5 rounded border-slate-700 text-purple-600 focus:ring-purple-500/20 cursor-pointer accent-purple-500"
                            />
                        </div>
                    </div>
                ))}
                {users.filter(user => !user.admin).length === 0 && (
                    <p className="text-slate-400 text-center">No regular users found.</p>
                )}
            </div>
        </div>
    )
}

export default ManageUsers