"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useUser } from "@clerk/nextjs"
import { useEffect } from "react"

const formSchema = z.object({
  firstName: z.string().min(2, { message: "Name must be at least 2 characters." }),
 
  email: z.string().email(), 
})

type FormData = z.infer<typeof formSchema>

export default function SettingsForm() {
  const { user, isLoaded } = useUser();
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      email: "",
    },
  })

  // 1. Load Real Data: When Clerk loads the user, fill the form
  useEffect(() => {
    if (isLoaded && user) {
      setValue("firstName", user.firstName || "");
      setValue("email", user.primaryEmailAddress?.emailAddress || "");
    }
  }, [isLoaded, user, setValue]);

  // 2. Save Real Data: Call Clerk's API to update the user
  const onSubmit = async (data: FormData) => {
    if (!user) return;

    try {
      await user.update({
        firstName: data.firstName,
      });
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    }
  }

  if (!isLoaded) {
    return <div>Loading user data...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      
      {/* First Name */}
      <div className="grid gap-2">
        <label className="text-white font-medium">First Name</label>
        <input 
          type="text" 
          className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500" 
          {...register("firstName")} 
        />
        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
      </div>

      {/* Email */}
      <div className="grid gap-2">
        <label className="text-white font-medium">Email</label>
        <input 
          type="email" 
          disabled
          className="w-full p-2 rounded bg-gray-700 text-gray-400 border border-gray-600 cursor-not-allowed" 
          {...register("email")}
        />
        <p className="text-xs text-gray-400">Email cannot be changed here.</p>
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