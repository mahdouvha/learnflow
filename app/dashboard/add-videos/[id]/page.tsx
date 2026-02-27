"use client"
import { useState } from "react"
import { use } from "react"
import { createClient } from "../../../utils/supabase/client"

export default function AddVideosPage({ params }) {
  const { id } = use(params)
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  async function handleAddVideo() {
    if (!title || !url) {
      setMessage("Please fill in both fields")
      return
    }
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.from("videos").insert({
      course_id: id,
      title,
      url,
      order: videos.length + 1,
    })
    if (error) {
      setMessage(error.message)
    } else {
      setVideos([...videos, { title, url }])
      setTitle("")
      setUrl("")
      setMessage("Video added! ✅")
    }
    setLoading(false)
  }

  return (
    <main className="bg-black min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <a href="/dashboard" className="text-gray-400 text-sm hover:text-yellow-400 mb-6 block">
          Back to Dashboard
        </a>
        <h1 className="text-yellow-400 text-3xl font-bold mb-2">Add Videos</h1>
        <p className="text-gray-400 text-sm mb-8">Add YouTube links to your course</p>
        <div className="flex flex-col gap-4 mb-8">
          <div>
            <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block">Video Title</label>
            <input
              type="text"
              placeholder="e.g. Introduction to HTML"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent border border-yellow-400/20 text-white px-4 py-3 rounded outline-none focus:border-yellow-400"
            />
          </div>
          <div>
            <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block">YouTube URL</label>
            <input
              type="text"
              placeholder="https://www.youtube.com/watch?v=..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-transparent border border-yellow-400/20 text-white px-4 py-3 rounded outline-none focus:border-yellow-400"
            />
          </div>
          {message && (
            <p className="text-yellow-400 text-sm">{message}</p>
          )}
          <button
            onClick={handleAddVideo}
            disabled={loading}
            className="bg-yellow-400 text-black font-bold py-3 rounded hover:bg-yellow-300 disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Video"}
          </button>
        </div>
        {videos.length > 0 && (
          <div>
            <h2 className="text-white font-bold mb-4">Videos added:</h2>
            <div className="flex flex-col gap-2">
              {videos.map((v, i) => (
                <div key={i} className="border border-yellow-400/20 rounded p-3 text-gray-400 text-sm">
                  {i + 1}. {v.title}
                </div>
              ))}
            </div>
            <a href="/dashboard" className="mt-6 bg-yellow-400 text-black font-bold py-3 rounded hover:bg-yellow-300 block text-center">
              Done
            </a>
          </div>
        )}
      </div>
    </main>
  )
}