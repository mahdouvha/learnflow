"use client"
import { useState } from "react"
export default function SignupPage(){
    const [role, setRole] = useState("student")

    return(
            <main className="bg-black min-h-screen flex items-center justify-center px-4">
      <div className="border border-yellow-400/20 rounded p-8 w-full max-w-md">
        <h1 className="text-yellow-400 text-3xl font-bold mb-2">Create Account</h1>
        <p className="text-gray-400 text-sm mb-6">Choose how you'll use LearnFlow</p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setRole("student")}
            className={`border rounded p-4 text-center transition ${role === "student" ? "border-yellow-400 bg-yellow-400/10" : "border-yellow-400/20"}`}
          >
            <div className="text-3xl mb-2">🎓</div>
            <div className="text-white font-bold text-sm">Student</div>
            <div className="text-gray-400 text-xs">I want to learn</div>
          </button>
          <button
            onClick={() => setRole("instructor")}
            className={`border rounded p-4 text-center transition ${role === "instructor" ? "border-yellow-400 bg-yellow-400/10" : "border-yellow-400/20"}`}
          >
            <div className="text-3xl mb-2">💡</div>
            <div className="text-white font-bold text-sm">Instructor</div>
            <div className="text-gray-400 text-xs">I want to teach</div>
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <input type="text" placeholder="Full Name" className="bg-transparent border border-yellow-400/20 text-white px-4 py-3 rounded outline-none focus:border-yellow-400" />
          <input type="email" placeholder="Email" className="bg-transparent border border-yellow-400/20 text-white px-4 py-3 rounded outline-none focus:border-yellow-400" />
          <input type="password" placeholder="Password" className="bg-transparent border border-yellow-400/20 text-white px-4 py-3 rounded outline-none focus:border-yellow-400" />
          <button className="bg-yellow-400 text-black font-bold py-3 rounded hover:bg-yellow-300">
            {role === "instructor" ? "Start Teaching →" : "Create Account →"}
          </button>
        </div>

        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account? <a href="/login" className="text-yellow-400">Log in</a>
        </p>
      </div>
    </main>
    )
}