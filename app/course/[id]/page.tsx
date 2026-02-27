"use client"
import { useEffect, useState } from "react"
import { use } from "react"
import { createClient } from "../../utils/supabase/client"

export default function CoursePage({ params }) {
  const { id } = use(params)
  const [course, setCourse] = useState(null)
  const [videos, setVideos] = useState([])
  const [activeVideo, setActiveVideo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      const supabase = createClient()

      const { data: courseData } = await supabase
        .from("courses")
        .select("*")
        .eq("id", id)
        .single()

      console.log("Looking for course id:", id)
      console.log("Course data:", courseData)

      const { data: videosData } = await supabase
        .from("videos")
        .select("*")
        .eq("course_id", id)
        .order("order")

      if (courseData) setCourse(courseData)
      if (videosData && videosData.length > 0) {
        setVideos(videosData)
        setActiveVideo(videosData[0])
      }
      setLoading(false)
    }
    getData()
  }, [])

  if (loading) return (
    <main className="bg-black min-h-screen flex items-center justify-center">
      <p className="text-yellow-400">Loading course...</p>
    </main>
  )

  if (!course) return (
    <main className="bg-black min-h-screen flex items-center justify-center">
      <p className="text-red-400">Course not found</p>
    </main>
  )

  return (
    <main className="bg-black min-h-screen">
      <div className="border-b border-yellow-400/20 px-8 py-4 flex justify-between items-center">
        <a href="/dashboard/my-courses" className="text-yellow-400 font-bold text-xl">LearnFlow</a>
        <a href="/dashboard/my-courses" className="text-gray-400 text-sm hover:text-yellow-400">← Back to My Courses</a>
      </div>

      <div className="grid grid-cols-3 h-screen">
        <div className="col-span-2 p-8">
          {activeVideo ? (
            <div>
              <div className="bg-gray-900 rounded-lg overflow-hidden mb-4 aspect-video flex items-center justify-center">
                {activeVideo.url.includes("youtube") ? (
                  <iframe
                    src={activeVideo.url.replace("watch?v=", "embed/")}
                    className="w-full h-full"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={activeVideo.url}
                    controls
                    className="w-full h-full"
                  />
                )}
              </div>
              <h2 className="text-white text-2xl font-bold">{activeVideo.title}</h2>
              <p className="text-gray-400 text-sm mt-1">From: {course.title}</p>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-6xl mb-4">{course.emoji}</div>
                <h2 className="text-white text-2xl font-bold mb-2">{course.title}</h2>
                <p className="text-gray-400">No videos uploaded yet</p>
              </div>
            </div>
          )}
        </div>

        <div className="border-l border-yellow-400/20 p-6 overflow-y-auto">
          <h3 className="text-white font-bold mb-4">Course Content</h3>
          {videos.length === 0 ? (
            <p className="text-gray-400 text-sm">No videos yet</p>
          ) : (
            <div className="flex flex-col gap-2">
              {videos.map((video, index) => (
                <button
                  key={video.id}
                  onClick={() => setActiveVideo(video)}
                  className={`text-left p-3 rounded border transition ${activeVideo?.id === video.id ? "border-yellow-400 bg-yellow-400/10 text-yellow-400" : "border-yellow-400/20 text-gray-400 hover:border-yellow-400"}`}
                >
                  <span className="text-xs mr-2">{index + 1}.</span>
                  {video.title}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}