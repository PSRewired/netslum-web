import Titlebar from "./App/Titlebar.jsx";
import Footer from "./App/Footer.jsx";
import {Outlet} from "react-router-dom";

import './app.scss';

const App = () => (
    <>
        <Titlebar/>
        <main className="container">
            <Outlet/>
        </main>
        <Footer/>
    </>
);

export default App
