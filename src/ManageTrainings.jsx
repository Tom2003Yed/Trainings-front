import React, { useEffect } from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { AppContext } from './AppContext';
import { useState } from 'react';

function ManageTrainings() {
    const navigate = useNavigate();
    const { setTrainings } = useContext(AppContext);

    const [title, setTitle] = useState('');
    const [master, setMaster] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const [errors, setErrors] = useState({
        title: false,
        master: false,
        date: false,
        time: false
    });

    const [masters, setMasters] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/users')
            .then(res => res.json())
            .then(allUsers => {
                const filteredUsersByMasterBoolean = allUsers.filter(user => user.master === true)
                setMasters(filteredUsersByMasterBoolean);
            })
            .catch(err => console.log('Error fetching masters: ', err));
    }, [])

    const handleNewTraining = () => {

        const isMasterEmpty = master === 'disabled' || master === ''; // if one of them is true so --- const isMasterEmpty = true

        if (title == '' || isMasterEmpty == '' || date == '' || time == '') {
            // alert('one of the inputs or more are empty');
            setErrors({
                title: title === '',
                master: isMasterEmpty,
                date: date === '',
                time: time === ''
            });
        } else {
            setErrors({ title: false, master: false, date: false, time: false });

            const newTraining = {
                title,
                master,
                date,
                time
            }

            fetch('http://localhost:3000/trainings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTraining)
            })
                .then(res => res.json())
                .then(data => {
                    setTrainings(prev => [...prev, data]);
                    alert('New Training Added Successfully!');
                    setTitle('');
                    setMaster('');
                    setDate('');
                    setTime('');
                })
                .catch(err => console.log(err))
        }
    }

    return (
        < div >
            <button
                onClick={() => navigate('/myTraining')}
                className="bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 hover:from-cyan-500 hover:via-sky-600 hover:to-blue-700 text-white font-extrabold py-2.5 px-5 rounded-xl shadow-[0_0_15px_rgba(14,165,233,0.5)] hover:shadow-[0_0_25px_rgba(14,165,233,0.8)] ring-2 ring-sky-300/70 animate-pulse-slow transform hover:scale-110 active:scale-95 transition-all duration-300 ease-in-out mb-4 tracking-wide uppercase"
            >
                Back
            </button>
            <div>
                <h1 className='text-3xl font-bold mb-6 text-center'>
                    New Training!
                </h1>

                {errors.title && <div className="text-red-500 text-sm font-semibold mb-1">This input is empty!</div>}
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='w-full mb-3 max-w-md px-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-xl text-white placeholder-slate-400 outline-none backdrop-blur-sm transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                />

                {errors.master && <div className="text-red-500 text-sm font-semibold mb-1">Please choose a master!</div>}
                <select
                    value={master}
                    onChange={(e) => setMaster(e.target.value)}
                    className={`w-full mb-3 px-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-xl outline-none backdrop-blur-sm transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:shadow-[0_0_15px_rgba(168,85,247,0.15)] cursor-pointer appearance-none ${master === '' || master === 'disabled' ? 'text-slate-400' : 'text-white'
                        }`}
                >
                    <option value="disabled">Master</option>
                    {masters.map(user => (
                        <option
                            key={user._id}
                            value={user.name}
                            className="bg-slate-800 text-white"
                        >
                            {user.name}
                        </option>
                    ))}
                </select>

                {errors.date && <div className="text-red-500 text-sm font-semibold mb-1">This input is empty!</div>}
                <input
                    type="text"
                    placeholder="Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className='w-full mb-3 max-w-md px-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-xl text-white placeholder-slate-400 outline-none backdrop-blur-sm transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                />

                {errors.time && <div className="text-red-500 text-sm font-semibold mb-1">This input is empty!</div>}
                <input
                    type="text"
                    placeholder="Time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className='w-full mb-3 max-w-md px-4 py-3 bg-slate-900/50 border border-purple-500/30 rounded-xl text-white placeholder-slate-400 outline-none backdrop-blur-sm transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:shadow-[0_0_15px_rgba(168,85,247,0.15)]'
                />

                <button
                    onClick={() => handleNewTraining()}
                    className='bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 hover:from-cyan-500 hover:via-sky-600 hover:to-blue-700 text-white font-extrabold py-2.5 px-5 rounded-xl shadow-[0_0_15px_rgba(14,165,233,0.5)] hover:shadow-[0_0_25px_rgba(14,165,233,0.8)] ring-2 ring-sky-300/70 animate-pulse-slow transform hover:scale-110 active:scale-95 transition-all duration-300 ease-in-out mb-4 tracking-wide uppercase'
                >
                    Create New Training!
                </button>
            </div>
        </div >
    )
}

export default ManageTrainings