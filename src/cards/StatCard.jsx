function StatCard({ title, value, color }) {

    return (

        <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">

            <h2 className="text-gray-500 text-sm">
                {title}
            </h2>

            <p className={`text-4xl font-bold mt-4 ${color}`}>
                {value}
            </p>

        </div>

    )
}

export default StatCard