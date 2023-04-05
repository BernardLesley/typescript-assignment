/* eslint-disable linebreak-style */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Main/Main";
import Settings from "./Settings/Settings";
import Header from "./Header/Header";
import "./app.css";
const App = () => {
    return (
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/" element={<Main />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
