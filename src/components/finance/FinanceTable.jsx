import { useEffect, useState } from "react"
import { supabase } from "../../services/supabaseClient"
import { useAuth } from "../../context/AuthContext"

export default function FinanceTable() {

    const { user } = useAuth()

    const [finances, setFinances] = useState([])

    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState("")
    const [type, setType] = useState("Entrada")

    useEffect(() => {

        if (user?.id) {
            loadFinances()
        }

    }, [user])

    async function loadFinances() {

        const { data, error } = await supabase
            .from("finances")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })

        if (error) {
            console.log(error.message)
            return
        }

        setFinances(data || [])
    }

    async function addFinance() {

        if (!description || !amount) {
            alert("Preencha todos os campos")
            return
        }

        const { error } = await supabase
            .from("finances")
            .insert([
                {
                    user_id: user.id,
                    type,
                    description,
                    amount: Number(amount)
                }
            ])

        if (error) {
            alert(error.message)
            return
        }

        setDescription("")
        setAmount("")

        loadFinances()
    }

    async function deleteFinance(id) {

        await supabase
            .from("finances")
            .delete()
            .eq("id", id)

        loadFinances()
    }

    const entradas = finances
        .filter((item) => item.type === "Entrada")
        .reduce((acc, item) => acc + Number(item.amount), 0)

    const saidas = finances
        .filter((item) => item.type === "Saída")
        .reduce((acc, item) => acc + Number(item.amount), 0)

    const saldo = entradas - saidas

    return (

        <div className="bg-white p-6 rounded-2xl shadow-sm">

            <h2 className="text-2xl font-bold mb-6">
                Financeiro
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="border p-3 rounded-xl"
                >
                    <option>Entrada</option>
                    <option>Saída</option>
                </select>

                <input
                    type="text"
                    placeholder="Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-3 rounded-xl"
                />

                <input
                    type="number"
                    placeholder="Valor"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="border p-3 rounded-xl"
                />

                <button
                    onClick={addFinance}
                    className="bg-blue-600 text-white rounded-xl"
                >
                    Adicionar
                </button>

            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">

                <div className="bg-green-100 p-4 rounded-xl">
                    <p>Entradas</p>

                    <h3 className="text-2xl font-bold">
                        R$ {entradas}
                    </h3>
                </div>

                <div className="bg-red-100 p-4 rounded-xl">
                    <p>Saídas</p>

                    <h3 className="text-2xl font-bold">
                        R$ {saidas}
                    </h3>
                </div>

                <div className="bg-blue-100 p-4 rounded-xl">
                    <p>Saldo</p>

                    <h3 className="text-2xl font-bold">
                        R$ {saldo}
                    </h3>
                </div>

            </div>

            <div className="space-y-4">

                {finances.map((item) => (

                    <div
                        key={item.id}
                        className="border rounded-xl p-4 flex justify-between items-center"
                    >

                        <div>

                            <h3 className="font-bold">
                                {item.description}
                            </h3>

                            <p>
                                {item.type}
                            </p>

                            <p>
                                R$ {item.amount}
                            </p>

                        </div>

                        <button
                            onClick={() => deleteFinance(item.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg"
                        >
                            Excluir
                        </button>

                    </div>

                ))}

            </div>

        </div>
    )
}