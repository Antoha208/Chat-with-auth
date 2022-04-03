import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import { authRoutes, allRoutes } from "./routes";
import {REGISTRATION_ROUTE} from '../../utils/consts'

const AppRouter = () => {
  const isAuth = true
  return (
    <Routes>
      {isAuth && authRoutes.map(({path, Component}) =>
        <Route key = {path} path = {path} element = {<Component />} exact />
      )}
      {allRoutes.map(({path, Component}) => 
        <Route key = {path} path = {path} element = {<Component />} exact />
      )}
      <Route path = "*" element = {<Navigate replace to = {REGISTRATION_ROUTE} />} />
    </Routes>
  )

}

export default AppRouter;