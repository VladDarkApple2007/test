import { Outlet } from "react-router-dom";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

export function RootLayout() {
    return (
        <div className="flex min-h-screen flex-col font-sans antialiased">
            <Header />
            <main className="flex-1 container mx-auto py-6 px-4 md:px-6 md:py-10">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
