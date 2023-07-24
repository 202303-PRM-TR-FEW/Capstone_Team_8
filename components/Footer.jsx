import Link from "next/link";
import { LinkedinIcon } from "next-share";

const LINKS = [
  {
    name: "Abdulkadir Çelebi",
    id: 1,
    profile: [
      {
        platformId: "12a",
        platform: "Linkedin",
        link: "https://www.linkedin.com/in/abdulkadircelebi/",
        icon: <LinkedinIcon size={32} round />,
        iconId: "123",
      },
      {
        platform: "GitHub",
        platformId: "12b",
        link: "https://github.com/celebiabdulkadir",
      },
    ],
  },
  {
    name: "Cenk Erdönmez",
    id: 2,
    profile: [
      {
        platform: "Linkedin",
        platformId: "12c",
        link: "https://www.linkedin.com/in/cenk-erd%C3%B6nmez-b3a41324b/",
        icon: <LinkedinIcon size={32} round />,
      },
      {
        platform: "GitHub",
        platformId: "12d",
        link: "https://github.com/CenkErdonmez",
      },
    ],
  },
  {
    name: "Deniz Hürmeydan",
    id: 3,
    profile: [
      {
        platform: "Linkedin",
        platformId: "12e",
        link: "https://www.linkedin.com/in/deniz-hurmeydan/",
        icon: <LinkedinIcon size={32} round />,
      },
      {
        platform: "GitHub",
        platformId: "12q",
        link: "https://github.com/denizhurmeydan",
      },
    ],
  },
  {
    name: "Günce Nehir Gençay",
    id: 4,
    profile: [
      {
        platform: "Linkedin",
        platformId: "12z",
        link: "https://www.linkedin.com/in/guncenehir/",
        icon: <LinkedinIcon size={32} round />,
      },
      {
        platform: "GitHub",
        platformId: "12x",
        link: "https://github.com/guncenehir",
      },
    ],
  },
  {
    name: "Nafie Asfour",
    id: 5,
    profile: [
      {
        platform: "Linkedin",
        platformId: "12v",
        link: "https://www.linkedin.com/in/nafie-asfour/",
        icon: <LinkedinIcon size={32} round />,
      },
      {
        platform: "GitHub",
        platformId: "12n",
        link: "https://github.com/nafieasfour",
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
          {LINKS.map(({ name, profile, id }) => (
            <div key={name} className="space-y-4">
              <div
                key={id}
                variant="small"
                color="blue-gray"
                className="font-medium opacity-40"
              >
                {name}
              </div>
              {profile.map((profileItem) => (
                <>
                  <div className="flex items-center gap-2">
                    {/* <i key={profileItem.platformId}>{profileItem?.icon} </i>{" "} */}
                    <Link key={profileItem.link} href={profileItem.link}>
                      {profileItem.platform}
                    </Link>
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
