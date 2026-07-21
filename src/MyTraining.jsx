import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from './AppContext'

function MyTraining() {
    const navigate = useNavigate();
    const { users, trainings, setUsers, loggedInUser, setLoggedInUser } = useContext(AppContext);

    let filteredTrainings;

    // DELETE USER
    const handleDeleteUser = (id) => {
        fetch(`http://localhost:3000/users/${id}`, {
            method: 'DELETE'
        })
            .then(() => setUsers(prev => prev.filter(user => user._id !== id)))
            .catch(err => console.log(err));
    }

    const handleCancelTraining = (userId, trainingId) => {
        fetch(`http://localhost:3000/users/${userId}/cancelTraining`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ trainingId })
        })
            .then(res => res.json())
            .then(userWithUpdatedArray => {
                setLoggedInUser(userWithUpdatedArray);
                alert('Training canceled successfully');
            })
            .catch(err => console.log(err))
    }

    // CHECK USER LOGIN
    useEffect(() => {
        if (users.length === 0 || !loggedInUser) {
            navigate('/');
        }
    }, [loggedInUser, users, navigate]);

    if (!loggedInUser) {
        return null;
    }
    return (
        <div className="max-w-4xl w-full mx-auto p-6">
            {loggedInUser?.admin && (
                <p
                    className="text-xl font-medium text-green-400 mb-4"
                >
                    You are an admin!
                </p>
            )}
            <div className="grid gap-4" >
                <div key={loggedInUser._id} className="bg-slate-900/70 border border-slate-700 rounded-2xl p-5 flex items-center justify-between gap-4">
                    <div>
                        <p className="text-white font-semibold">{loggedInUser.name}</p>
                        <p className="text-slate-400 text-sm">{loggedInUser.email}</p>
                    </div>
                    <button
                        onClick={() => {
                            navigate('/')
                            setLoggedInUser(null);
                        }}
                        className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors duration-200 cursor-pointer bg-transparent border-none p-0 outline-none"
                    >
                        Sign Out
                    </button>
                    <button
                        onClick={() => handleDeleteUser(loggedInUser._id)}
                        className="px-4 py-2 bg-red-600 rounded-xl text-white hover:bg-red-500 transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <h1 className="text-3xl font-bold">My Trainings</h1>

                {loggedInUser?.master && (
                    < div > here i stopped!</div> // here i stopped!
                )}

                <button
                    className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => navigate('/TrainingRegistrationPage')}
                >
                    Register for Training
                </button>
            </div>

            {
                loggedInUser?.admin && (
                    <div>
                        <button
                            onClick={() => navigate('/ManageTrainings')}
                            className="bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 hover:from-cyan-500 hover:via-sky-600 hover:to-blue-700 text-white font-extrabold py-2.5 px-5 rounded-xl shadow-[0_0_15px_rgba(14,165,233,0.5)] hover:shadow-[0_0_25px_rgba(14,165,233,0.8)] ring-2 ring-sky-300/70 animate-pulse-slow transform hover:scale-110 active:scale-95 transition-all duration-300 ease-in-out mb-4 tracking-wide uppercase"
                        >
                            Manage Trainings
                        </button>
                        <br />
                        <button
                            onClick={() => navigate('/ManageUsers')}
                            className="bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 hover:from-cyan-500 hover:via-sky-600 hover:to-blue-700 text-white font-extrabold py-2.5 px-5 rounded-xl shadow-[0_0_15px_rgba(14,165,233,0.5)] hover:shadow-[0_0_25px_rgba(14,165,233,0.8)] ring-2 ring-sky-300/70 animate-pulse-slow transform hover:scale-110 active:scale-95 transition-all duration-300 ease-in-out mb-4 tracking-wide uppercase"
                        >
                            Manage Users
                        </button>
                    </div>
                )
            }

            {
                (filteredTrainings = loggedInUser.trainings?.filter(userT => trainings.find(dbT => dbT._id === userT._id))) && filteredTrainings.length > 0 ? (
                    filteredTrainings.map(training => (
                        <div key={training._id} className="bg-slate-900/70 border border-slate-700 rounded-2xl p-5 mb-4">
                            <h2 className="text-xl font-bold text-white mb-1">{training.title}</h2>
                            <p className="text-slate-400 mb-1">{users.find(u => u._id === training.master)?.name || training.master}</p> {/* עובר על מערך המשתמשים שזה מערך של אובייקטים וכשהוא מוצא את האחד עם התז המתאים הוא מחזיר לי אובייקט ועליו אני לוקח את השם של המשתמש */}
                            <p className="text-slate-300">📅 {training.date} · ⏰ {training.time}</p>
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleCancelTraining(loggedInUser._id, training._id)}>
                                Cancel Booking
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-slate-400">No trainings booked yet. Go register for a training.</p>
                )
            }
        </div >
    )
}

export default MyTraining