import React, { useState } from'react';

import Tabs from'@mui/material/Tabs';
import Tab from'@mui/material/Tab';

import {
    BrowserRouter,
    Routes,
    Route,
    Link,
  } from 'react-router-dom';

import ToDoApp from "./ToDoApp"
import Home from "./Home"

export default function TabApp() {
    const [value, setValue] = useState('home');

    const handleChange = (event, value) => {
        setValue(value);
    };

    return (
        <div>
            <BrowserRouter>
                <Tabs value={value} onChange={handleChange}>
                    <Tab
                        value="home"
                        label="Home"
                        component={Link}
                        to="/"
                    />
                    <Tab
                        value="todos"
                        label="To-Do-List"
                        component={Link}
                        to="/ToDoApp"
                    />
                </Tabs>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/ToDoApp" element={<ToDoApp />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}