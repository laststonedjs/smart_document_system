import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const AppLayout = () => {
    return (
        <div>
            <Navbar />

            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
}

export default AppLayout