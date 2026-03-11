import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

export function Layout() {
    return (
        <>
            <Header />
            <main className="flex grow justify-center my-6">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}