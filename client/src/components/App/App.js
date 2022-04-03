import React from "react";

import { BrowserRouter } from 'react-router-dom';
import AppRouter from "./AppRouter.js";

//import Paper from '@material-ui/core/Paper';

const App = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )

}

export default App;
