"use client"
import { useState } from "react"
import { createClient } from "../../utils/supabase/client"

export default function CreateCoursePage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [emoji, setEmoji] = useState("📚")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  async function handleSubmit() {
    
    if (!title || !description || !price || !category) {
      setMessage("Please fill in all fields before publishing.")
      setLoading(false)
      return
    }
    setLoading(true)
    const supabase = createClient()

    const { data: userData } = await supabase.auth.getUser()
    const user = userData.user

    if (!user) {
      setMessage("You must be logged in")
      setLoading(false)
      return
    }

    const { error } = await supabase.from("courses").insert({
      title,
      description,
      price: parseInt(price),
      category,
      emoji,
      instructor_id: user.id,
      instructor_name: user.user_metadata?.full_name || "Instructor",
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage("Course created successfully! 🎉")
      setTitle("")
      setDescription("")
      setPrice("")
      setCategory("")
      setEmoji("📚")
    }
    setLoading(false)
  }

  return (
    <main className="bg-black min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-yellow-400 text-3xl font-bold mb-2">Create a Course</h1>
        <p className="text-gray-400 text-sm mb-8">Fill in the details and publish your course</p>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block">Course Title</label>
            <input
              type="text"
              placeholder="e.g. Full Stack Web Development"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent border border-yellow-400/20 text-white px-4 py-3 rounded outline-none focus:border-yellow-400"
            />
          </div>

          <div>
            <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block">Description</label>
            <textarea
              placeholder="What will students learn?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full bg-transparent border border-yellow-400/20 text-white px-4 py-3 rounded outline-none focus:border-yellow-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block">Price ($)</label>
              <input
                type="number"
                placeholder="e.g. 99"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-transparent border border-yellow-400/20 text-white px-4 py-3 rounded outline-none focus:border-yellow-400"
              />
            </div>
            <div>
              <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-black border border-yellow-400/20 text-white px-4 py-3 rounded outline-none focus:border-yellow-400"
              >
                <option value="">Select category</option>
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Business">Business</option>
                <option value="Data">Data</option>
                <option value="Content Creation">Content Creation</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block">Emoji Icon</label>
            <div className="flex gap-3 flex-wrap">
              {["📚", "💻", "🎨", "📣", "📊", "🎬", "🚀", "📷"].map((e) => (
                <button
                  key={e}
                  onClick={() => setEmoji(e)}
                  className={`text-2xl p-3 border rounded transition ${emoji === e ? "border-yellow-400 bg-yellow-400/10" : "border-yellow-400/20"}`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {message && <p className="text-yellow-400 text-sm text-center">{message}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-yellow-400 text-black font-bold py-3 rounded hover:bg-yellow-300 disabled:opacity-50"
          >
            {loading ? "Publishing..." : "Publish Course →"}
          </button>
        </div>
      </div>
    </main>
  )
}