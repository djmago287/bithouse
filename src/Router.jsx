import { BrowserRouter, Navigate, redirect, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { useState } from "react";
import { useValidatelogin } from "./customhooks/ValidateLoginCustomhook";
//the main router
export const RouterMain = ()=>
{
  const {validateuser} =  useValidatelogin();
  const [validatelogin,setvalidatelogin] =  useState(validateuser());

  return( 
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage/>} /> 
        <Route path="/" element={validatelogin?<DashboardPage/>:<Navigate to="/login" replace/>}/>
        <Route path="*" element={<Navigate to="/login" replace/>}/> 
      </Routes>
    </BrowserRouter>
  )
}
