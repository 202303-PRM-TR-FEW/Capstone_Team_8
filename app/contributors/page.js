import React from "react";
import PageLayout from "@/components/PageLayout";
const contributorsData = [
  {
    id: 1,
    name: "Abdulkadir Çelebi",
    contribution: "Bug fixes",
    image: "https://via.placeholder.com/150", // Replace with actual image URLs
    info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis vestibulum tortor.",
  },
  {
    id: 2,
    name: "Cenk Erdönmez",
    contribution: "Feature implementation",
    image: "https://via.placeholder.com/150", // Replace with actual image URLs
    info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis vestibulum tortor.",
  },
  {
    id: 3,
    name: "Deniz Hürmeydan",
    contribution: "Documentation",
    image: "https://via.placeholder.com/150", // Replace with actual image URLs
    info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis vestibulum tortor.",
  },
  {
    id: 4,
    name: "Günce Nehir Gençay",
    contribution: "Documentation",
    image: "https://via.placeholder.com/150", // Replace with actual image URLs
    info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis vestibulum tortor.",
  },
  {
    id: 5,
    name: "Nafie Asfour",
    contribution: "Documentation",
    image: "https://via.placeholder.com/150", // Replace with actual image URLs
    info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis vestibulum tortor.",
  },
];

function Contributors() {
  return (
    <PageLayout>
      <div className="flex flex-col justify-center items-center p-12 m-5">
        <h1 className="font-bold text-gray-800 text-4xl p-12">Contributors</h1>
        <div className="flex flex-col  lg:flex-row gap-2 lg:justify-start justify-center items-center">
          {/* Wrap cards in a container */}
          {contributorsData.map((contributor) => (
            <div
              key={contributor.id}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-slate-900 dark:border-gray-700 m-4 h-96"
            >
              <img className="rounded-t-lg" src={contributor.image} alt="img" />

              <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {contributor.name}
                </h5>

                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Contribution: {contributor.contribution}
                </p>

                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
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
