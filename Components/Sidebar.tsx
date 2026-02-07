"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, BarChart3, Settings } from "lucide-react"

const Sidebar = () => {
    const pathname = usePathname();
    const navItems = [{ name: "Dashboard", href: "/dashboard", icon: LayoutDashboard }, { name: "Dashboard Analytics", href: "/dashboard/analytics", icon: BarChart3 }, { name: "Dashboard Settings", href: "/dashboard/setting", icon: Settings }]

    return (
        <aside className='w-64 hidden md:flex flex-col p-4 border-r border-r-gray-400'>
            {navItems.map((item) => (
                <Link key={item.href} className={`${pathname === item.href ? "bg-blue-100 text-blue-900" : "text-gray-500 hover:text-gray-900 hover:bg-gray-300"} flex items-center gap-3 rounded-lg px-3 py-2 transition-all`} href={item.href}> <item.icon className="h-4 w-4" /> {item.name}</Link>
            ))}
        </aside>
    )
}

export default Sidebar
