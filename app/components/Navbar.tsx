export default function Navbar() {
  return (
    <nav className="bg-black border-b border-yellow-400/20 px-8 py-4 flex justify-between items-center">
      <a href="/" className="text-yellow-400 text-2xl font-bold">LearnFlow</a>
      <div className="flex gap-6 items-center">
        <a href="#" className="text-white text-sm hover:text-yellow-400">Courses</a>
        <a href="#" className="text-white text-sm hover:text-yellow-400">Teach</a>
        <a href="/login" className="text-white text-sm hover:text-yellow-400">Log In</a>
        <a href="/signup" className="bg-yellow-400 text-black px-4 py-2 text-sm font-bold rounded">Sign Up</a>
      </div>
    </nav>
  )
}