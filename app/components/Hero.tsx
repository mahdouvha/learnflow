export default function Hero(){
    return(
        <section className="bg-black flex flex-col items-center justify-center min-h-screen text-center px-4">
            <h1 className="text-white text-6xl font-bold mb-4">
                Learn Anything. <span className="text-yellow-400">Teach</span>Everything
            </h1>
            <p className="text-gray-400 text-xl max-w-xl mb-10 ">
                A marketplace where experts share knowledge and students find the skills they need.
            </p>
            <div className="flex gap-4 ">
                <button className="bg-yellow-400 text-black px-8 py-4 font-bold rounded hover:bg-yellow-300">Browse Courses</button>
            <button className="border border-yellow-400 text-yellow-400 px-8 py-4 font-bold rounded hover:bg-yellow-400 hover:text-black">Start teaching </button>
            </div>

        </section>
    )
}