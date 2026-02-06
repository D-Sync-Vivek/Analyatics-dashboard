"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  role: z.enum(["admin", "user", "viewer"], { message: "Please select a role." }),
})

type FormData = z.infer<typeof formSchema>

export default function SettingsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "John Doe",
      email: "john@example.com",
      role: "admin",
    },
  })

  const onSubmit = async (data: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Form Data:", data)
    alert("Settings updated!")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      
      {/* Full Name */}
      <div className="grid gap-2">
        <label className="text-white font-medium">Full Name</label>
        <input 
          type="text" 
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500" 
          {...register("fullName")} 
        />
        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
      </div>

      {/* Email */}
      <div className="grid gap-2">
        <label className="text-white font-medium">Email</label>
        <input 
          type="email" 
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500" 
          {...register("email")}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-500 text-white p-2 rounded disabled:opacity-50 transition-colors"
      >
        {isSubmitting ? "Saving..." : "Save Changes"}
      </button>
    </form>
  )
}