import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import AppRouter from "./AppRouter.js";
import styles from './App.module.css'
import { changeIsAuth } from "../../store/authReducer";
import { setUser } from "../../store/userReducer";

import LinearProgress from '@material-ui/core/LinearProgress';
import { check } from "../../http/userApi.js";

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)
  const isAuth = useSelector(state => state.isAuth.isAuth)

  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);
  const localStore = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    check().then(data => {
      dispatch(setUser(localStore.id, localStore.username, localStore.roles, localStore.iat, localStore.exp))
      dispatch(changeIsAuth(true))
    }).finally(() => setLoading(false))
  }, [])

//  localStorage.removeItem('user')

  const progressRef = useRef(() => {});
  useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);
  
  
  if (loading) {
    return (
      <div className = { styles.section }>
        <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
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
