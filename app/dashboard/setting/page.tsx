import SettingForm from "@/Components/SettingForm"

const page = () => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>
      <SettingForm/>
    </div>
  )
}

export default page