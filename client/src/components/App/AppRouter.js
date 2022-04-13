import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { authRoutes, allRoutes } from "./routes";
import {REGISTRATION_ROUTE} from '../../utils/consts'

const AppRouter = () => {
  //const isAuth = false
  const isAuth = useSelector(state => state.isAuth.isAuth)
 
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