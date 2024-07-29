import { plans } from "@/constants/PLANS"
import Plan from "./Plan"

export default function Plans() {
  return (
    <div className="flex flex-col container">
      <h1 className="text-3xl font-bold text-gray-700 text-center mt-14">Plans that dont burn your 💳</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-14 my-10">
        {plans.map((plan, index) => (
          <Plan key={index} {...plan} />
        ))}
      </div>
          <div className={`hidden bg-emerald-500 bg-purple-500 bg-cyan-500 bg-gray-600 hover:text-emerald-500 hover:text-gray-600 hover:text-purple-500 hover:text-cyan-500 text-emerald-500 text-gray-600 text-purple-500 text-cyan-500 hover:border-emerald-500 border-emerald-500 hover:border-purple-500 border-purple-500 hover:border-cyan-500 border-cyan-500  hover:border-gray-600 border-gray-600`}/>
    </div>
  )
}
