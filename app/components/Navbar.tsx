export default function Navbar(){
    return(
        <nav className="bg-black border-b border-yellow-400/20 px-8 py-4 flex justify-between items-center">
            <span className="text-yellow-400 text-2xl font-bold">LearnFlow</span>
            <div className="flex gap-6">
                <a href="#" className="text-white text-sm hover:text-yellow-400">Courses</a>
                <a href="#" className="text-white text-sm hover:text-yellow-400">Teach</a>
                <a href="#" className="bg-yellow-400 text-black px-4 py-2 text-sm font-bold rounded">Sign up </a>
            </div>
        </nav>
    )
}