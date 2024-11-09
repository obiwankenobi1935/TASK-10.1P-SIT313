import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './navbar';
import Login from './login';
import SignUp from './signup';
import Profile from './profile';
import Home from './Home';
import { auth } from './firebase';
import './App.css';
import PricingPlans from './PricingPlans';
import FindQuestion from './FindQuestions';
import PostForm from './PostForm';
import Newsletter from './newsletter';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <Router>
      <NavBar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/plans" element={<PricingPlans />}/>
        <Route path="/findquestions" element={<FindQuestion />}/>
        <Route path="/postform" element={<PostForm />}/>
        <Route path="/newsletter" element={<Newsletter />} />
      </Routes>
    </Router>
  );
}

export default App;
