import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import CoursesSection from "./components/CoursesSection"
export default function Home(){
  return(
    <main className="bg-black min-h-screen ">
      <Navbar />
      <Hero />
      <CoursesSection />
    
    </main>
  )
}
