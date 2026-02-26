"use client"
import { useEffect, useState } from "react"
import { createClient } from "../utils/supabase/client"

export default function CoursesSection() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getCourses() {
      const supabase = createClient()
      const { data, error } = await supabase.from("courses").select("*")
      if (data) setCourses(data)
      setLoading(false)
    }
    getCourses()
  }, [])

  if (loading) return (
    <section className="bg-black py-20 px-8 text-center">
      <p className="text-yellow-400">Loading courses...</p>
    </section>
  )

  if (courses.length === 0) return (
    <section className="bg-black py-20 px-8 text-center">
      <p className="text-gray-400">No courses yet. Be the first to create one!</p>
    </section>
  )

  return (
    <section className="bg-black py-20 px-8">
      <h2 className="text-white text-4xl font-bold text-center mb-12">
        Featured <span className="text-yellow-400">Courses</span>
      </h2>
      <div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto">
        {courses.map((course) => (
          <div key={course.id} className="border border-yellow-400/20 rounded p-6 hover:border-yellow-400 transition">
            <div className="text-5xl mb-4">{course.emoji}</div>
            <div className="text-yellow-400 text-xs uppercase mb-2">{course.category}</div>
            <h3 className="text-white font-bold text-lg mb-1">{course.title}</h3>
            <p className="text-gray-400 text-sm mb-1">By {course.instructor_name}</p>
            <p className="text-gray-500 text-xs mb-4 line-clamp-2">{course.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-yellow-400 font-bold text-xl">${course.price}</span>
              <button className="bg-yellow-400 text-black px-4 py-2 text-sm font-bold rounded">Enroll</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}