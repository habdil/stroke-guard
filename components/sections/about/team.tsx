import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const teamMembers = [
  {
    name: "Dr. Jane Doe",
    role: "Lead Data Scientist",
    image: "/images/team/team.png",
    description: "Expert in machine learning and healthcare analytics with 10+ years experience."
  },
  // // Add more team members as needed
];

export default function Team() {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <Card key={member.name} className="border-none shadow-lg">
              <CardHeader>
                <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardTitle className="text-center">{member.name}</CardTitle>
                <p className="text-center text-muted-foreground">{member.role}</p>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  {member.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}