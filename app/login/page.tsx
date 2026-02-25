export default function LoginPage(){
    return(
            <main className="bg-black min-h-screen flex items-center justify-center px-4">
      <div className="border border-yellow-400/20 rounded p-8 w-full max-w-md">
        <h1 className="text-yellow-400 text-3xl font-bold mb-2">Welcome Back</h1>
        <p className="text-gray-400 text-sm mb-8">Log in to your LearnFlow account</p>
        <div className="flex flex-col gap-4">
          <input type="email" placeholder="Email" className="bg-transparent border border-yellow-400/20 text-white px-4 py-3 rounded outline-none focus:border-yellow-400" />
          <input type="password" placeholder="Password" className="bg-transparent border border-yellow-400/20 text-white px-4 py-3 rounded outline-none focus:border-yellow-400" />
          <button className="bg-yellow-400 text-black font-bold py-3 rounded hover:bg-yellow-300">
            Log In
          </button>
        </div>
        <p className="text-gray-400 text-sm text-center mt-6">
          Don't have an account? <a href="/signup" className="text-yellow-400">Sign up</a>
        </p>
      </div>
    </main>
    )
}