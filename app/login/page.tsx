"use client"
import { useState } from "react"
import { createClient } from "../utils/supabase/client"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  async function handleLogin() {
    setLoading(true)
    const supabase = createClient()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setMessage(error.message)
    } else {
      window.location.href = "/dashboard"
    }
    setLoading(false)
  }

  return (
    <main className="bg-black min-h-screen flex items-center justify-center px-4">
      <div className="border border-yellow-400/20 rounded p-8 w-full max-w-md">
        <h1 className="text-yellow-400 text-3xl font-bold mb-2">Welcome Back</h1>
        <p className="text-gray-400 text-sm mb-8">Log in to your LearnFlow account</p>
        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent border border-yellow-400/20 text-white px-4 py-3 rounded outline-none focus:border-yellow-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent border border-yellow-400/20 text-white px-4 py-3 rounded outline-none focus:border-yellow-400"
          />
          {message && <p className="text-red-400 text-sm text-center">{message}</p>}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="bg-yellow-400 text-black font-bold py-3 rounded hover:bg-yellow-300 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In →"}
          </button>
        </div>
        <p className="text-gray-400 text-sm text-center mt-6">
          Don't have an account? <a href="/signup" className="text-yellow-400">Sign up</a>
        </p>
      </div>
    </main>
  )
}