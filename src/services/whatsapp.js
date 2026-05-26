import { supabase }
    from "./supabaseClient"

export async function sendWhatsAppMessage(
    userId,
    message
) {

    const { data }
        = await supabase
            .from("settings")
            .select("*")
            .eq("user_id", userId)
            .single()

    if (!data) {

        console.log(
            "Configurações não encontradas"
        )

        return
    }

    const number =
        data.whatsapp_number

    const apiKey =
        data.whatsapp_apikey

    if (!number || !apiKey) {

        console.log(
            "WhatsApp não configurado"
        )

        return
    }

    const text =
        encodeURIComponent(message)

    const url =
        `https://api.callmebot.com/whatsapp.php?phone=${number}&text=${text}&apikey=${apiKey}`

    try {

        await fetch(url)

        console.log(
            "WhatsApp enviado"
        )

    }

    catch (error) {

        console.log(error)

    }

}