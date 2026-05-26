import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../services/supabaseClient"

const AuthContext = createContext()

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        checkUser()

        const { data } = supabase.auth.onAuthStateChange((_, session) => {
            setUser(session?.user || null)
        })

        return () => {
            data.subscription.unsubscribe()
        }
    }, [])

    async function checkUser() {
        const { data } = await supabase.auth.getSession()
        setUser(data?.session?.user || null)
        setLoading(false)
    }

    async function signUp(email, password) {
        return await supabase.auth.signUp({ email, password })
    }

    async function signIn(email, password) {
        return await supabase.auth.signInWithPassword({
            email,
            password
        })
    }

    async function signOut() {
        await supabase.auth.signOut()
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, signUp, signIn, signOut }}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}