import { useEffect, useState, useCallback } from "react"
import { supabase } from "../../services/supabaseClient"
import { useAuth } from "../../context/AuthContext"

export default function StockTable() {

    const { user } = useAuth()

    const [products, setProducts] = useState([])

    const [name, setName] = useState("")
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")

    const loadProducts = useCallback(async () => {
        if (!user) return

        const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })

        if (!error) {
            setProducts(data)
        }
    }, [user])

    async function addProduct() {

        if (!name || !quantity || !price) {
            return alert("Preencha todos os campos")
        }

        const { error } = await supabase
            .from("products")
            .insert([
                {
                    user_id: user.id,
                    name,
                    quantity: Number(quantity),
                    price: Number(price)
                }
            ])

        if (error) {
            return alert(error.message)
        }

        setName("")
        setQuantity("")
        setPrice("")

        loadProducts()
    }

    async function deleteProduct(id) {

        await supabase
            .from("products")
            .delete()
            .eq("id", id)

        loadProducts()
    }

    useEffect(() => {
        if (!user) return

        const fetchProducts = async () => {
            await loadProducts()
        }

        fetchProducts()
    }, [user])

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm">

            <h2 className="text-2xl font-bold mb-6">
                Controle de Estoque
            </h2>

            <div className="grid grid-cols-3 gap-4 mb-6">

                <input
                    type="text"
                    placeholder="Produto"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-3 rounded-lg"
                />

                <input
                    type="number"
                    placeholder="Quantidade"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="border p-3 rounded-lg"
                />

                <input
                    type="number"
                    placeholder="Preço"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border p-3 rounded-lg"
                />

            </div>

            <button
                onClick={addProduct}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg mb-6"
            >
                Adicionar Produto
            </button>

            <div className="space-y-4">

                {products.map((product) => (

                    <div
                        key={product.id}
                        className="border rounded-xl p-4 flex justify-between items-center"
                    >

                        <div>
                            <h3 className="font-bold">
                                {product.name}
                            </h3>

                            <p className="text-gray-500">
                                Quantidade: {product.quantity}
                            </p>

                            <p className="text-gray-500">
                                R$ {product.price}
                            </p>
                        </div>

                        <button
                            onClick={() => deleteProduct(product.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                        >
                            Excluir
                        </button>

                    </div>

                ))}

            </div>

        </div>
    )
}