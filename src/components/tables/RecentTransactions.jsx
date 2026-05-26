function RecentTransactions() {

    const transactions = [

        {
            id: 1,
            type: "Entrada",
            category: "Venda",
            value: "R$ 2.500",
            color: "text-green-600",
        },

        {
            id: 2,
            type: "Saída",
            category: "Fornecedor",
            value: "R$ 800",
            color: "text-red-600",
        },

        {
            id: 3,
            type: "Entrada",
            category: "Serviços",
            value: "R$ 1.200",
            color: "text-green-600",
        },

    ]

    return (

        <div className="bg-white rounded-2xl shadow-md p-6 mt-10">

            <h2 className="text-2xl font-bold mb-6">

                Últimas Movimentações

            </h2>

            <table className="w-full">

                <thead>

                    <tr className="border-b">

                        <th className="text-left pb-4">
                            Tipo
                        </th>

                        <th className="text-left pb-4">
                            Categoria
                        </th>

                        <th className="text-left pb-4">
                            Valor
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {transactions.map((item) => (

                        <tr
                            key={item.id}
                            className="border-b"
                        >

                            <td className="py-4">
                                {item.type}
                            </td>

                            <td className="py-4">
                                {item.category}
                            </td>

                            <td className={`py-4 font-bold ${item.color}`}>
                                {item.value}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    )
}

export default RecentTransactions