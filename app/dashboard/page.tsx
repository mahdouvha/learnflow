"use client"
import { useEffect, useState } from "react"
import { createClient } from "../utils/supabase/client"

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getUser() {
      const supabase = createClient()
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
      setLoading(false)
    }
    getUser()
  }, [])

  if (loading) return (
    <main className="bg-black min-h-screen flex items-center justify-center">
      <p className="text-yellow-400">Loading...</p>
    </main>
  )

  if (!user) {
    window.location.href = "/login"
    return null
  }

  const role = user.user_metadata?.role || "student"
  const fullName = user.user_metadata?.full_name || "User"

  return (
    <main className="bg-black min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="border border-yellow-400/20 rounded p-6 mb-8">
          <p className="text-yellow-400 text-sm uppercase tracking-widest mb-1">
            {role === "instructor" ? "💡 Instructor" : "🎓 Student"}
          </p>
          <h1 className="text-white text-3xl font-bold">Welcome, {fullName}!</h1>
          <p className="text-gray-400 mt-1">{user.email}</p>
            <button
  onClick={async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = "/"
  }}
  className="mt-4 text-sm text-red-400 hover:text-red-300 underline"
>
  Log out
</button>
        </div>

        {role === "instructor" ? (
          <div className="grid grid-cols-2 gap-6">
            <div className="border border-yellow-400/20 rounded p-6 hover:border-yellow-400 transition cursor-pointer">
              <div className="text-4xl mb-4">📹</div>
              <h2 className="text-white font-bold text-xl mb-2">Create Course</h2>
              <p className="text-gray-400 text-sm">Upload videos and publish your first course</p>
            </div>
            <div className="border border-yellow-400/20 rounded p-6 hover:border-yellow-400 transition cursor-pointer">
              <div className="text-4xl mb-4">📊</div>
              <h2 className="text-white font-bold text-xl mb-2">My Earnings</h2>
              <p className="text-gray-400 text-sm">Track your sales and revenue</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            <div className="border border-yellow-400/20 rounded p-6 hover:border-yellow-400 transition cursor-pointer">
              <div className="text-4xl mb-4">📚</div>
              <h2 className="text-white font-bold text-xl mb-2">My Courses</h2>
              <p className="text-gray-400 text-sm">Continue where you left off</p>
            </div>
            <div className="border border-yellow-400/20 rounded p-6 hover:border-yellow-400 transition cursor-pointer">
              <div className="text-4xl mb-4">🏆</div>
              <h2 className="text-white font-bold text-xl mb-2">My Progress</h2>
              <p className="text-gray-400 text-sm">Track your learning journey</p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}