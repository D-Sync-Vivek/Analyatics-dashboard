import Sidebar from "@/Components/Sidebar"
import { UserButton } from "@clerk/nextjs"

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <div className='flex flex-row h-screen overflow-hidden'>
            <Sidebar />
            <main className="flex flex-col flex-1">
                <header className="flex h-14 items-center gap-4 border-b bg-gray-900/40 px-6 lg:h-15">
                    <div className="flex-1">
                        <h1 className="font-semibold text-lg">Dashboard</h1>
                    </div>
                    <UserButton />
                </header>
                <p className="border-b border-gray-800"></p>
                <div className="flex-1 overflow-y-auto p-6"> {children}</div>
            </main>
        </div>
    )
}

export default layout
