"use client"
import { useEffect, useState } from "react"
import { createClient } from "../../utils/supabase/client"

export default function MyCoursesPage() {
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getPurchasedCourses() {
      const supabase = createClient()
      const { data: userData } = await supabase.auth.getUser()
      const user = userData.user

      if (!user) {
        window.location.href = "/login"
        return
      }

      const { data: purchases } = await supabase
        .from("purchases")
        .select("course_id")
        .eq("student_id", user.id)

      if (!purchases || purchases.length === 0) {
        setLoading(false)
        return
      }

      const courseIds = purchases.map((p) => p.course_id)

      const { data: coursesData } = await supabase
      .from("courses")
      .select("*")
      .in("id", courseIds.map(id => id.toString()))
      console.log("Course IDs from purchases:", courseIds)
      console.log("Courses found:", coursesData)

      if (coursesData) setCourses(coursesData)
      setLoading(false)
    }
    getPurchasedCourses()
  }, [])

  if (loading) return (
    <main className="bg-black min-h-screen flex items-center justify-center">
      <p className="text-yellow-400">Loading your courses...</p>
    </main>
  )

  return (
    <main className="bg-black min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <a href="/dashboard" className="text-gray-400 text-sm hover:text-yellow-400 mb-6 block">← Back to Dashboard</a>
        <h1 className="text-yellow-400 text-3xl font-bold mb-2">My Courses</h1>
        <p className="text-gray-400 text-sm mb-8">Courses you have purchased</p>

        {courses.length === 0 ? (
          <div className="border border-yellow-400/20 rounded p-8 text-center">
            <div className="text-5xl mb-4">📚</div>
            <p className="text-white font-bold mb-2">No courses yet</p>
            <p className="text-gray-400 text-sm mb-4">Browse our marketplace and find your first course</p>
            <a href="/" className="bg-yellow-400 text-black px-6 py-3 font-bold rounded hover:bg-yellow-300 inline-block">
              Browse Courses
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="border border-yellow-400/20 rounded p-6 hover:border-yellow-400 transition">
                <div className="text-4xl mb-3">{course.emoji}</div>
                <div className="text-yellow-400 text-xs uppercase mb-1">{course.category}</div>
                <h3 className="text-white font-bold text-lg mb-1">{course.title}</h3>
                <p className="text-gray-400 text-sm mb-4">By {course.instructor_name}</p>
                <a href={`/course/${course.id}`} className="bg-yellow-400 text-black px-4 py-2 text-sm font-bold rounded hover:bg-yellow-300 w-full block text-center">
  Continue Learning →
</a>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}