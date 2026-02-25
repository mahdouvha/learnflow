const courses = [
  { id: 1, title: "Full-Stack Web Development", instructor: "Yassine K.", price: 149, emoji: "💻", category: "Development" },
  { id: 2, title: "UX/UI Design Masterclass", instructor: "Meriem B.", price: 119, emoji: "🎨", category: "Design" },
  { id: 3, title: "Digital Marketing Strategy", instructor: "Omar T.", price: 89, emoji: "📣", category: "Marketing" },
]

export default function CoursesSection() {
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
            <p className="text-gray-400 text-sm mb-4">By {course.instructor}</p>
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