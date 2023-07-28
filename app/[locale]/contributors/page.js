import React from "react";
import PageLayout from "@/components/PageLayout";
import Image from "next/legacy/image";
const contributorsData = [
  {
    id: 1,
    name: "Abdulkadir Çelebi",
    contribution: "Bug fixes",
    image: "/1668447565144.jpg", // Replace with actual image URLs
    info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis vestibulum tortor.",
  },
  {
    id: 2,
    name: "Cenk Erdönmez",
    contribution: "Feature",
    image: "/1685543987007.jpg", // Replace with actual image URLs
    info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis vestibulum tortor.",
  },
  {
    id: 3,
    name: "Deniz Hürmeydan",
    contribution: "Documentation",
    image: "/channels4_profile.jpg", // Replace with actual image URLs
    info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis vestibulum tortor.",
  },
  {
    id: 4,
    name: "Günce Nehir Gençay",
    contribution: "Documentation",
    image: "/B598FE0E-8020-4276-9FD1-8F0E06CF1A44.jpg", // Replace with actual image URLs
    info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis vestibulum tortor.",
  },
  {
    id: 5,
    name: "Nafie Asfour",
    contribution: "Documentation",
    image: "/1668601656647.jpg", // Replace with actual image URLs
    info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis vestibulum tortor.",
  },
];

function Contributors() {
  return (
    <PageLayout>
      <div className="grid grid-col-span-12 justify-center items-center p-12 m-5 h-full">
        <h1 className="font-bold text-gray-800 text-4xl p-12">Contributors</h1>
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-3 justify-items-center">
          {/* Wrap cards in a container */}
          {contributorsData.map((contributor) => (
            <div
              key={contributor.id}
              className="max-w-sm grid-col-span-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-indigo-950 dark:border-gray-700 m-4 h-full"
            >
              <div className="relative h-48 sm:h-60 lg:h-80 w-full">
                <Image
                  src={contributor.image}
                  layout="fill"
                  className="rounded-xl drop-shadow-lg"
                  objectFit="cover"
                  alt="Picture of the author"
                />
              </div>

              <div className="p-5">
                <h5 className="py-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {contributor.name}
                </h5>

                <p className="pb-2 font-normal text-gray-700 dark:text-gray-400">
                  Contribution: {contributor.contribution}
                </p>

                <p className="py-2 font-normal text-gray-700 dark:text-gray-400">
                  {contributor.info}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}

export default Contributors;
