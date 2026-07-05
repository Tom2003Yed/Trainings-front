import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AppContext } from './AppContext'
import Login from './Login'
import Register from './Register'
import TrainingRegistrationPage from './TrainingRegistrationPage'
import MyTraining from './MyTraining'
import ManageTrainings from './ManageTrainings'

function App() {
  const [users, setUsers] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/trainings')
      .then(res => res.json())
      .then(data => setTrainings(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <AppContext.Provider value={{
      users,
      setUsers,
      trainings,
      setTrainings,
      loggedInUser,
      setLoggedInUser
    }}>
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white flex items-center justify-center p-4 font-sans select-none">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/MyTraining" element={<MyTraining />} />
          <Route path="/TrainingRegistrationPage" element={<TrainingRegistrationPage />} />
          <Route path="/ManageTrainings" element={<ManageTrainings />} />
        </Routes>
      </div>
    </AppContext.Provider >
  )
}

export default App