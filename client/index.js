import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import App from './App.jsx';
import styles from './styles/main.scss';

// I'm not sure what the container is for, maybe that was copied in at initial setup? PG
// do we use container for anything else? I'm commenting out for now PG
// const container = document.getElementById('app') 


const root = ReactDOM.createRoot(document.getElementById("app"));

root.render(<App />);