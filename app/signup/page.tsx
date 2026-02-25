export default function SignupPage(){
    return(
            <main className="bg-black min-h-screen flex items-center justify-center px-4">
      <div className="border border-yellow-400/20 rounded p-8 w-full max-w-md">
        <h1 className="text-yellow-400 text-3xl font-bold mb-2">Create Account</h1>
        <p className="text-gray-400 text-sm mb-8">Join LearnFlow as a student or instructor</p>
        <div className="flex flex-col gap-4">
          <input type="text" placeholder="Full Name" className="bg-transparent border border-yellow-400/20 text-white px-4 py-3 rounded outline-none focus:border-yellow-400" />
          <input type="email" placeholder="Email" className="bg-transparent border border-yellow-400/20 text-white px-4 py-3 rounded outline-none focus:border-yellow-400" />
          <input type="password" placeholder="Password" className="bg-transparent border border-yellow-400/20 text-white px-4 py-3 rounded outline-none focus:border-yellow-400" />
          <button className="bg-yellow-400 text-black font-bold py-3 rounded hover:bg-yellow-300">
            Create Account
          </button>
        </div>
        <p className="text-gray-400 text-sm text-center mt-6">
          Already have an account? <a href="/login" className="text-yellow-400">Log in</a>
        </p>
      </div>
    </main>

    )
}