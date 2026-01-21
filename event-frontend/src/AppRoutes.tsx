import LoginPage from "./Page/LoginPage.tsx";
import SignUpPage from "./Page/SignUpPage.tsx";
import Header from "./Component/Header";

import EventPage from "./Page/EventPage.tsx";
import AboutPage from "./Page/AboutPage.tsx";
import ParametersPage from "./Page/ParametersPage.tsx";
import ContactPage from "./Page/ContactPage.tsx";



import {useMemo} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import type {User} from "./utils/types";


type AppRoutesProps = {
    user: User | null;
}

export default function AppRoutes({
                                      user,
                                  }: AppRoutesProps){

    const token = localStorage.getItem("token");
    const isAuthentificated = useMemo(() => Boolean(token && user),[token,user]);
    return (
    <>
    <Header user={user} />
    
    <Routes>

        <Route 
            path="/"
            element={
                    isAuthentificated ? (
                    <Navigate to="/events" replace/>

                ) : (
                    <LoginPage/>
                )
            }
        />
        <Route
            path="/login"
            element={
                    <LoginPage/>
            }
        />
        <Route
            path="/signup"
            element={
                    <SignUpPage/>
            }
        />
        <Route path="/events" element={<EventPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/parameters" element={<ParametersPage />} />
        <Route path="/Contact" element={<ContactPage />} />




        
    </Routes>
    </>

    );
}