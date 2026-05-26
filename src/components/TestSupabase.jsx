import { useEffect } from "react"
import { supabase } from "../services/supabaseClient"

export default function TestSupabase() {

    useEffect(() => {

        async function test() {

            const { data, error } = await supabase
                .from("finances")
                .select("*")

            console.log("DATA:", data)
            console.log("ERROR:", error)

        }

        test()

    }, [])

    return (
        <div>
            SUPABASE TEST OK ✔
        </div>
    )
}