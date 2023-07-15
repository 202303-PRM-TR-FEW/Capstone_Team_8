import { Typography } from "@material-tailwind/react";
import Link from "next/link";

const LINKS = [
  {
    name: "Abdulkadir Çelebi",
    profile: [
      {
        platform: "Linkedin",
        link: "https://www.linkedin.com/in/abdulkadircelebi/",
      },
      {
        platform: "GitHub",
        link: "https://github.com/celebiabdulkadir",
      },
      {
        platform: "Portfolio",
        link: "#",
      },
    ],
  },
  {
    name: "Cenk Erdönmez",
    profile: [
      {
        platform: "Linkedin",
        link: "https://www.linkedin.com/in/cenk-erd%C3%B6nmez-b3a41324b/",
      },
      {
        platform: "GitHub",
        link: "https://github.com/CenkErdonmez",
      },
      {
        platform: "Portfolio",
        link: "#",
      },
    ],
  },
  {
    name: "Deniz Hürmeydan",
    profile: [
      {
        platform: "Linkedin",
        link: "https://www.linkedin.com/in/deniz-hurmeydan/",
      },
      {
        platform: "GitHub",
        link: "https://github.com/denizhurmeydan",
      },
      {
        platform: "Portfolio",
        link: "#",
      },
    ],
  },
  {
    name: "Günce Nehir Gençay",
    profile: [
      {
        platform: "Linkedin",
        link: "https://www.linkedin.com/in/guncenehir/",
      },
      {
        platform: "GitHub",
        link: "https://github.com/guncenehir",
      },
      {
        platform: "Portfolio",
        link: "#",
      },
    ],
  },
  {
    name: "Nafie Asfour",
    profile: [
      {
        platform: "Linkedin",
        link: "https://www.linkedin.com/in/nafie-asfour/",
      },
      {
        platform: "GitHub",
        link: "https://github.com/nafieasfour",
      },
      {
        platform: "Portfolio",
        link: "#",
      },
    ],
  },
];

const currentYear = new Date().getFullYear();

export default function Foooter() {
  return (
    <footer className="relative w-full">
      <div className="mx-auto w-full max-w-7xl px-8 justify-center items-center">
        <div className="mx-auto grid w-full grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-6">
          <Typography>Contributors</Typography>
          {LINKS.map(({ name, profile }) => (
            <div key={name} className="space-y-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-medium opacity-40"
              >
                {name}
              </Typography>
              {profile.map((profile, index) => (
                <Typography
                  key={index}
                  as="a"
                  href={profile.link}
                  color="gray"
                  className="py-1.5 font-normal transition-colors hover:text-blue-gray-900"
                >
                  <Link href={profile.link}>{profile.platform}</Link>
                </Typography>
              ))}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
