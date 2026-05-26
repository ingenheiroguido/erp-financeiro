import { useState } from "react"

function FinanceModal({ open, onClose, onAdd }) {

    const [category, setCategory] = useState("")
    const [value, setValue] = useState("")
    const [type, setType] = useState("Entrada")

    if (!open) return null

    const isDisabled = !category || !value

    function handleSubmit() {

        if (isDisabled) return

        const newTransaction = {
            id: Date.now(),
            type,
            category,
            value: Number(value).toFixed(2),
            date: new Date().toLocaleDateString(),
        }

        onAdd(newTransaction)

        setCategory("")
        setValue("")
        setType("Entrada")

        onClose()
    }

    return (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

            <div className="bg-white w-full max-w-lg rounded-2xl p-6">

                <div className="flex items-center justify-between mb-6">

                    <h2 className="text-2xl font-bold">
                        Nova Movimentação
                    </h2>

                    <button onClick={onClose}>
                        ✕
                    </button>

                </div>

                <div className="flex flex-col gap-4">

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
                        placeholder="Categoria (ex: Venda, Fornecedor)"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border p-3 rounded-xl"
                    />

                    <input
                        type="number"
                        placeholder="Valor"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="border p-3 rounded-xl"
                    />

                    <button
                        onClick={handleSubmit}
                        disabled={isDisabled}
                        className={`p-3 rounded-xl text-white transition ${isDisabled ? "bg-gray-400" : "bg-black hover:bg-gray-800"
                            }`}
                    >
                        Salvar
                    </button>

                </div>

            </div>

        </div>
    )
}

export default FinanceModal