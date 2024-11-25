import Image from 'next/image'
import { Suspense } from 'react'
import { PuppyVoting } from '../components/PuppyVoting'
import ConfettiWrapper from '../components/ConfettiWrapper'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <Suspense fallback={null}>
        <ConfettiWrapper />
      </Suspense>
      <header className="bg-white py-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-center">
            <Image 
              src="https://images.squarespace-cdn.com/content/v1/6247a9b2250ff313db5bc439/77499f27-2240-4482-9d44-7281a408166d/NRGRR_logo.jpg?format=1500w" 
              alt="Neuse River Golden Retriever Rescue Logo" 
              width={300} 
              height={150} 
              className="h-auto w-auto max-h-32" 
              priority
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h1 className="text-5xl font-bold text-amber-800 mb-4">Help Name Our Thanksgiving Puppies!</h1>
          <p className="text-xl text-amber-700 mb-6">Vote for your favorite names and support our rescue efforts</p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-amber-800 mb-4">Meet the Mother</h2>
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-6">
            <Image 
              src="https://i.imgur.com/Unil5uu.jpeg" 
              alt="Zeva, a beautiful black dog with amber eyes, wearing a green collar" 
              width={300} 
              height={400} 
              className="rounded-lg object-cover w-full md:w-auto max-w-[300px] max-h-[400px]" 
              priority
            />
            <div>
              <p className="text-amber-700 mb-4">
                Our golden hearted girl Zeva came into the rescue recently. We were very surprised, and thankful, to find out that she's expecting puppies! Help us prepare for their arrival by participating in our naming fundraiser!
              </p>
              <p className="text-amber-700">Expected due date: Thanksgiving</p>
            </div>
          </div>
        </section>

        <PuppyVoting />
      </main>

      <footer className="bg-amber-800 text-amber-50 py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-semibold mb-2">Neuse River Golden Retriever Rescue</h3>
              <p>Dedicated to rescuing and rehoming Golden Retrievers in need</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
              <p>Email: info@neuserivergoldens.org</p>
              <p>Phone: (555) 123-4567</p>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p>&copy; 2023 Neuse River Golden Retriever Rescue. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

