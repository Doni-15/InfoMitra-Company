import { Outlet } from "react-router-dom";

export function MainLayout(){
    return (
        <>
            <main className="flex flex-1 pt-16 min-h-[90vh] flex-col overflow-hidden">
                <Outlet />
            </main>
        </>
    );
}