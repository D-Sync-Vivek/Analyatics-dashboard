'use client'
import { ColumnDef } from "@tanstack/react-table"
import { Transaction } from "@/types/analytics"
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Transaction>[] = [
    {
        accessorKey: "user",
        header: "Customer",
        cell: ({ row }) => {
            const userName = row.original.customer_name;
            const userEmail = row.original.customer_email;
            return (
                <>
                    <div className="font-medium">{userName}</div>
                    <div className="text-gray-600">{userEmail}</div>
                </>
            )
        }
    },
    {
        accessorKey: "amount",
        header: ({ column }) => {
            return (
                <button
                    className="flex items-center hover:cursor-pointer"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Amount
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </button>
            )
        },
        cell: ({ row }) => {
            const amount = row.original.amount
            return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount)
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            const normalizedStatus = status.toLowerCase();
            // logic for dynamic coloring
            const statusStyles: Record<string, string> = {
                success: "bg-green-100 text-green-700 border-green-200", 
                processing: "bg-blue-100 text-blue-700 border-blue-200",
                failed: "bg-red-100 text-red-700 border-red-200",
                pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
            };

            // Fallback to gray if status is unknown
            const style = statusStyles[status as keyof typeof statusStyles] || "bg-gray-800 text-gray-300";

            return (
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${style} capitalize`}>
                    {status}
                </span>
            );
        },
    }
];