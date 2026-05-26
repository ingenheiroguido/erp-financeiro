import { useEffect, useState }
    from "react"

import { supabase }
    from "../services/supabaseClient"

import { useAuth }
    from "../context/AuthContext"

export default function Settings() {

    const { user } = useAuth()

    const [companyName, setCompanyName]
        = useState("")

    const [whatsappNumber, setWhatsappNumber]
        = useState("")

    const [whatsappApiKey, setWhatsappApiKey]
        = useState("")

    useEffect(() => {

        if (user) {

            loadSettings()

        }

    }, [user])

    async function loadSettings() {

        const { data }
            = await supabase
                .from("settings")
                .select("*")
                .eq("user_id", user.id)
                .single()

        if (data) {

            setCompanyName(
                data.company_name || ""
            )

            setWhatsappNumber(
                data.whatsapp_number || ""
            )

            setWhatsappApiKey(
                data.whatsapp_apikey || ""
            )

        }

    }

    async function saveSettings(e) {

        e.preventDefault()

        const { error }
            = await supabase
                .from("settings")
                .upsert([
                    {
                        user_id: user.id,

                        company_name: companyName,

                        whatsapp_number:
                            whatsappNumber,

                        whatsapp_apikey:
                            whatsappApiKey
                    }
                ])

        if (error) {

            alert("Erro ao salvar")

            return
        }

        alert("Configurações salvas")

    }

    return (

        <div
            style={{
                color: "white",
                display: "flex",
                justifyContent: "center",
                paddingTop: 40
            }}
        >

            <div
                style={{
                    background: "#111827",
                    padding: 40,
                    borderRadius: 24,
                    width: "100%",
                    maxWidth: 600,
                    boxShadow:
                        "0 0 30px rgba(0,0,0,0.3)"
                }}
            >

                <h1
                    style={{
                        marginBottom: 30
                    }}
                >
                    ⚙️ Configurações
                </h1>

                <form
                    onSubmit={saveSettings}
                    style={formStyle}
                >

                    <input
                        type="text"
                        placeholder="Empresa"
                        value={companyName}
                        onChange={(e) =>
                            setCompanyName(
                                e.target.value
                            )
                        }
                        style={inputStyle}
                    />

                    <input
                        type="text"
                        placeholder="WhatsApp"
                        value={whatsappNumber}
                        onChange={(e) =>
                            setWhatsappNumber(
                                e.target.value
                            )
                        }
                        style={inputStyle}
                    />

                    <input
                        type="text"
                        placeholder="API KEY"
                        value={whatsappApiKey}
                        onChange={(e) =>
                            setWhatsappApiKey(
                                e.target.value
                            )
                        }
                        style={inputStyle}
                    />

                    <button
                        type="submit"
                        style={buttonStyle}
                    >
                        Salvar Configurações
                    </button>

                </form>

            </div>

        </div>

    )

}

const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 20
}

const inputStyle = {
    padding: 15,
    borderRadius: 10,
    border: "1px solid #374151",
    background: "#1f2937",
    color: "white",
    fontSize: 16
}

const buttonStyle = {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: 15,
    borderRadius: 12,
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: 16
}