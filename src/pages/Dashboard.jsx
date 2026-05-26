function Dashboard() {
    return (

        <div>

            <h1 className="text-4xl font-bold mb-8">
                Dashboard ERP
            </h1>

            <div className="grid grid-cols-4 gap-5">

                <div className="bg-white p-5 rounded-2xl shadow-md">
                    <h2 className="text-gray-500">
                        Total em Caixa
                    </h2>

                    <p className="text-3xl font-bold mt-3">
                        R$ 12.500
                    </p>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-md">
                    <h2 className="text-gray-500">
                        Entradas
                    </h2>

                    <p className="text-3xl font-bold mt-3 text-green-600">
                        R$ 18.200
                    </p>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-md">
                    <h2 className="text-gray-500">
                        Saídas
                    </h2>

                    <p className="text-3xl font-bold mt-3 text-red-600">
                        R$ 5.700
                    </p>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow-md">
                    <h2 className="text-gray-500">
                        Produtos
                    </h2>

                    <p className="text-3xl font-bold mt-3">
                        128
                    </p>
                </div>

            </div>

        </div>
    )
}

export default Dashboard