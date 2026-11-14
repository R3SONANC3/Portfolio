import Hero from '@/components/sections/Hero'
import Work from '@/components/sections/Work'
import Experience from '@/components/sections/Experience'
import About from '@/components/sections/About'

export default function Home() {
  return (
    <main id="home">
      <Hero />
      <Work />
      <Experience />
      <About />
    </main>
  )
}
