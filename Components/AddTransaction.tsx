"use client"
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";

export default function AddTransaction() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const amount = formData.get("amount");
    const name = formData.get("name");
    const email = formData.get("email");

    // 1. Insert into Supabase
    const { error } = await supabase.from("transactions").insert({
      amount: amount,
      customer_name: name,
      customer_email: email,
      status: "success",
    });

    if (error) {
      alert("Error adding transaction");
      console.error(error);
    } else {
      // 2. Refresh the page to see the new data
      setIsOpen(false);
      router.refresh();
    }
    setLoading(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm transition-colors"
      >
        <PlusCircle className="h-4 w-4" />
        Add Transaction
      </button>
    );
  }

  return (
    <div className="p-4 border border-gray-700 rounded-lg bg-gray-800 mb-4 animate-in fade-in zoom-in duration-300">
      <h3 className="text-white font-semibold mb-4">New Transaction</h3>

      <form onSubmit={handleSubmit} className="grid grid-cols-1  gap-4 items-end">

        <div className="flex flex-col gap-5">
          {/* Name Input */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400">Name</label>
            <input name="name" required className="bg-gray-700 text-white rounded px-3 py-2 text-sm border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="John Doe" />
          </div>

          {/* Email Input */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400">Email</label>
            <input name="email" required className="bg-gray-700 text-white rounded px-3 py-2 text-sm border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="john@example.com" />
          </div>

          {/* Amount Input */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400">Amount ($)</label>
            <input name="amount" type="number" step="0.01" required className="bg-gray-700 text-white rounded px-3 py-2 text-sm border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="0.00" />
          </div>

        </div>
        {/* Buttons */}
        <div className="flex gap-2 h-9.5">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex-1 bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded text-sm transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded text-sm disabled:opacity-50 transition-colors"
          >
            {loading ? "..." : "Save"}
          </button>
        </div>

      </form>
    </div>
  );
}