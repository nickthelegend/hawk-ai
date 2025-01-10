import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

const teamMembers = [
  { name: "Jenny Rosum", role: "Customer Success Agent", image: "/placeholder.svg" },
  { name: "Sophie Chamberlain", role: "Specialized Support", image: "/placeholder.svg" },
  { name: "Lana Steiner", role: "VP of Customer Success", image: "/placeholder.svg" },
  { name: "Orlando Diggs", role: "Customer Success Lead", image: "/placeholder.svg" },
  { name: "Sasha Kindred", role: "Customer Success Lead", image: "/placeholder.svg" },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="container mx-auto px-4 py-16">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            We've got an entire team dedicated
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              to supporting you and your business
            </span>
          </h1>
          <p className="text-lg text-gray-300">
            Get help 24/7 with our award-winning support network of payments experts.
          </p>
        </div>

        <div className="mb-16 flex flex-wrap justify-center gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="text-center">
              <Image
                src={member.image}
                alt={member.name}
                width={200}
                height={200}
                className="mb-4 rounded-full"
              />
              <h3 className="font-semibold">{member.name}</h3>
              <p className="text-sm text-gray-400">{member.role}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold">Call us</h2>
            <p className="mb-2 text-gray-300">Call our team Mon-Fri from 8am to 5pm.</p>
            <p className="text-xl font-semibold">+1 (555) 000-0000</p>

            <h2 className="mb-4 mt-8 text-2xl font-bold">Chat with us</h2>
            <p className="mb-4 text-gray-300">Speak to our friendly team via live chat.</p>
            <Button variant="outline">Start a live chat</Button>

            <div className="mt-8">
              <p className="mb-2 text-gray-300">Shoot us an email</p>
              <p className="mb-2 text-gray-300">Message us on Twitter</p>
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-bold">Send us a message</h2>
            <form className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Input placeholder="First name" />
                <Input placeholder="Last name" />
              </div>
              <Input type="email" placeholder="Email" />
              <Input type="tel" placeholder="Phone number" />
              <Textarea placeholder="Your message" rows={4} />
              <Button type="submit" className="w-full">Send message</Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

