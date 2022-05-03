import React, { useEffect, useState } from "react";
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from "react-redux";
import AppRouter from "./AppRouter.js";
import styles from './App.module.css'
import { changeIsAuth } from "../../store/authReducer";
// import { setUser } from "../../store/userReducer";

import { check } from "../../http/userApi.js";
import Loader from "./Loader.js";

const App = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    check().then(data => {
      dispatch(changeIsAuth(true))
    }).finally(() => setLoading(false))
  }, [])
  
  
  if (loading) {
    return (
      <div className = { styles.section }>
        <Loader />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )

}

export default App;
