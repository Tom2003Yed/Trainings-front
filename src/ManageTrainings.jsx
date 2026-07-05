import React from 'react'
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

    const handleNewTraining = () => {

        if (title == '' || master == '' || date == '' || time == '') {
            alert('one of the inputs or more are empty');
        } else {


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
                <h1
                    className=''
                >
                    New Training!
                </h1>

                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className=''
                />

                <input
                    type="text"
                    placeholder="Master"
                    value={master}
                    onChange={(e) => setMaster(e.target.value)}
                    className=''
                />

                <input
                    type="text"
                    placeholder="Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className=''
                />

                <input
                    type="text"
                    placeholder="Time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className=''
                />

                <button
                    onClick={() => handleNewTraining()}
                >
                    Create New Training!
                </button>
            </div>
        </div >
    )
}

export default ManageTrainings