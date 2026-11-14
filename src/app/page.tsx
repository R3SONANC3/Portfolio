import Hero from '@/components/sections/Hero'
import Work from '@/components/sections/Work'
import Experience from '@/components/sections/Experience'
import Notes from '@/components/sections/Notes'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <main id="home">
      <Hero />
      <Work />
      <Experience />
      <Notes />
      <About />
      <Contact />
    </main>
  )
}
