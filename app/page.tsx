import Image from "next/image";
import { Suspense } from "react";
import { PuppyVoting } from "../components/PuppyVoting";
import ConfettiWrapper from "../components/ConfettiWrapper";

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
					<h1 className="text-5xl font-bold text-amber-800 mb-4">
						Help Name Our Thanksgiving Puppies!
					</h1>
					<p className="text-xl text-amber-700 mb-6">
						Vote for your favorite names and support our rescue efforts
					</p>
				</section>

				<section className="mb-12">
					<h2 className="text-3xl font-semibold text-amber-800 mb-4">
						Meet Zeva – The Brave Mama-to-Be
					</h2>
					<div className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-6">
						<a
							href="https://nrgrr.org"
							target="_blank"
							referrerPolicy="no-referrer"
						>
							<Image
								src="https://i.imgur.com/Unil5uu.jpeg"
								alt="Zeva, a beautiful black dog with amber eyes, wearing a green collar"
								width={300}
								height={400}
								className="rounded-lg object-cover w-full md:w-auto max-w-[300px] max-h-[400px]"
								priority
							/>
						</a>
						<div>
							<p className="text-amber-700 mb-4">
								Zeva’s story is one of unexpected hope and resilience. She was
								found staying in someone’s yard, where she had been for about a
								week. The kind homeowners started feeding her, realizing she was
								in need of some help. They contacted us, and we were able to
								bring Zeva into our care, giving her the chance for a fresh
								start. When she arrived, we discovered a sweet surprise—Zeva was
								pregnant! She’s expecting 5-7 puppies, due right around
								Thanksgiving. Along with her pregnancy, Zeva tested positive for
								heartworms. Unfortunately, she can’t begin treatment for them
								until after her puppies are weaned, so for now, we’re focusing
								on keeping her healthy and comfortable while she prepares for
								motherhood. Despite everything, Zeva remains calm, sweet, and
								gentle, and we know she’ll be an amazing mom to her pups. This
								Thanksgiving, we’re especially grateful for Zeva’s second chance
								and the little ones she’ll soon be welcoming into the world.
								Your support will help cover her medical care and ensure she and
								her puppies get all the care they need to thrive. Thank you for
								helping us give Zeva and her pups the happy, healthy future they
								deserve!
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
							<h3 className="text-xl font-semibold mb-2">
								Neuse River Golden Retriever Rescue
							</h3>
							<p>
								NRGRR is a 501(c)(3) organization in North Carolina that is
								dedicated to the rescue, rehabilitation and adoption of golden
								retrievers in need. The organization advocates responsible pet
								ownership, community education and protection of all dogs.
							</p>
						</div>
						<div>
							<h4 className="text-lg font-semibold mb-2">Contact Us</h4>
							<p>Email: info@nrgrr.org</p>
							<p>Phone: (919) 676-7144</p>
						</div>
					</div>
					<div className="mt-8 text-center">
						<p>
							&copy; 2024 Neuse River Golden Retriever Rescue, Inc. All rights
							reserved.
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
