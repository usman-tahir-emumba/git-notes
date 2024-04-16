import * as React from "react";
import { Route as RoutePath, Routes } from "react-router-dom";


import {LandingPage} from '../components/LandingPage/index.tsx';
import {HandleLoginCallback} from '../components/Login/handleCallback.tsx';
import {NotFound} from '../components/404/index.tsx';

export const Route = (
    <Routes>
        <RoutePath path="/" element={<LandingPage/>} />
        <RoutePath path="/git-login/callback" element={<HandleLoginCallback/>} />
        <RoutePath path="*" element={<NotFound/>} />
    </Routes>
);

export default Route;