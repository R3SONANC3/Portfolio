import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">
        Welcome to Jeerapat.dev
      </h1>
      <p className="text-lg md:text-xl text-center max-w-2xl mb-10">
        This is my portfolio website where I showcase my projects, skills, and experience as a developer. Feel free to explore and learn more about me!
      </p>
      <Image 
        src="/profile-picture.jpg" 
        alt="Jeerapat's Profile Picture" 
        width={300} 
        height={300} 
        className="rounded-full shadow-lg"
      />
    </div>
  );
}