import LoginPage from "./Page/LoginPage.tsx";
import SignUpPage from "./Page/SignUpPage.tsx";

import AccueilPage from "./Page/AccueilPage.tsx";
import EventPage from "./Page/EventPage.tsx";


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
    const isAuthentificated = useMemo(() => Boolean(token && user),[]);
    return (

    <Routes>
        <Route 
            path="/"
            element={
                    isAuthentificated ? (
                    <Navigate to="/events" replace/>

                ) : (
                    <AccueilPage/>
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
        <Route
            path="/events"
            element={
                    <EventPage/>
                
            }
        />
        
    </Routes>
    );
}