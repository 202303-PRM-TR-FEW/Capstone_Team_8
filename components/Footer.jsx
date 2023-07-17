import Link from "next/link";
import { LinkedinIcon } from "next-share";

const LINKS = [
  {
    name: "Abdulkadir Çelebi",
    profile: [
      {
        platform: "Linkedin",
        link: "https://www.linkedin.com/in/abdulkadircelebi/",
        icon: <LinkedinIcon size={32} round />,
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
        icon: <LinkedinIcon size={32} round />,
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
        icon: <LinkedinIcon size={32} round />,
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
        icon: <LinkedinIcon size={32} round />,
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
        icon: <LinkedinIcon size={32} round />,
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

export default function Foooter() {
  return (
    <footer className="relative w-full">
      <div className="mx-auto w-full max-w-7xl px-8 justify-center items-center">
        <div className="mx-auto grid w-full grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-6">
          <div>Contributors</div>
          {LINKS.map(({ name, profile }) => (
            <div key={name} className="space-y-4">
              <div
                variant="small"
                color="blue-gray"
                className="font-medium opacity-40"
              >
                {name}
              </div>
              {profile.map((profile, index) => (
                <>
                  <div
                    key={index}
                    as="a"
                    href={profile.link}
                    color="gray"
                    className="py-1.5 font-normal transition-colors hover:text-blue-gray-900"
                  ></div>
                  <div className="flex items-center gap-2">
                    <i>{profile?.icon} </i>{" "}
                    <Link href={profile.link}>{profile.platform}</Link>
                  </div>
                </>
              ))}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
