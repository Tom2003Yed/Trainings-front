import { useEffect, useState, useContext } from 'react';
import { AppContext } from './AppContext';
import { useNavigate } from 'react-router-dom';

function TrainingRegistrationPage() {
    const navigate = useNavigate();
    const { users, setUsers, trainings, setTrainings, loggedInUser, setLoggedInUser } = useContext(AppContext);

    // BOOK
    const handleBooking = (id) => {
        fetch(`http://localhost:3000/trainings/${id}/book`)
            .then(res => res.json())
            .then(data => {
                const fetchedTraining = data.training;



                let isAlreadyBooked = false;

                loggedInUser.trainings.forEach(training => {
                    if (training._id === fetchedTraining._id) {
                        isAlreadyBooked = true;
                    }
                });

                if (isAlreadyBooked) {
                    alert('You have already booked this training!');
                    return;
                }

                // אני יכול מסתבר לחסוך את הכאב ראש של ההוספה ופשוט להשתמש בדבר חדש שלמדתי שהוא בשרת נקרא PUSH$

                const updatedUser = {
                    ...loggedInUser,
                    trainings: [...loggedInUser.trainings, fetchedTraining]
                };

                fetch(`http://localhost:3000/users/${loggedInUser._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedUser)
                })
                    .then(res => res.json())
                    .then(updatedDataFromServer => {
                        setLoggedInUser(updatedDataFromServer);

                        setUsers(prev => prev.map(u => u._id === updatedDataFromServer._id ? updatedDataFromServer : u));

                        alert(data.message);
                    })
            })
    }

    // Delete Training
    const handleTrainingDelete = (id) => {
        fetch(`http://localhost:3000/trainings/${id}/delete`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                setTrainings(prev => prev.filter(training => training._id !== id))
                alert(data.message);
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="max-w-4xl w-full mx-auto p-6">

            <h1 className="text-3xl font-bold mb-6">Choose Your Training</h1>

            <button
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => navigate('/MyTraining')}
            >
                Go To My Trainings
            </button>



            {trainings.map(training => (
                <div key={training._id} className="bg-slate-900/70 border border-slate-700 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 mt-4">
                    <div>
                        <h2 className="text-xl font-bold text-white mb-1">{training.title}</h2>
                        {loggedInUser?.admin && (
                            <button
                                onClick={() => handleTrainingDelete(training._id)}
                                className=''
                            >
                                Delete Training
                            </button>
                        )}
                        <p className="text-cyan-400 font-medium text-sm mb-2">{users.find(u => u._id === training.master)?.name || training.master}</p>
                        <div className="flex gap-4 text-slate-400 text-sm">
                            <span>📅 {training.date}</span>
                            <span>⏰ {training.time}</span>
                        </div>
                    </div>
                    <button
                        onClick={() => handleBooking(training._id)}
                        className="px-4 py-2 bg-cyan-600 rounded-xl text-white hover:bg-cyan-500 transition-colors text-sm font-medium">
                        Book
                    </button>
                </div>
            ))}
        </div >
    )
}

export default TrainingRegistrationPage