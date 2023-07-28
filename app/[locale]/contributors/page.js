"use client";
import React from "react";
import PageLayout from "@/components/PageLayout";
import Image from "next/legacy/image";
import { useTranslations } from "next-intl";
import { LinkedinIcon } from "next-share";
import Link from "next/link";
const contributorsData = [
  {
    id: 1,
    name: "Abdulkadir Çelebi",
    image: "/1668447565144.jpg",
    linkedin: "https://www.linkedin.com/in/abdulkadircelebi/",
    github: "https://github.com/celebiabdulkadir",
  },
  {
    id: 2,
    name: "Cenk Erdönmez",
    image: "/1685543987007.jpg",
    linkedin: "https://www.linkedin.com/in/cenk-erd%C3%B6nmez-b3a41324b/",
    github: "https://github.com/CenkErdonmez",
  },
  {
    id: 3,
    name: "Deniz Hürmeydan",
    image: "/channels4_profile.jpg",
    linkedin: "https://www.linkedin.com/in/deniz-hurmeydan/",
    github: "https://github.com/denizhurmeydan",
  },
  {
    id: 4,
    name: "Günce Nehir Gençay",
    image: "/B598FE0E-8020-4276-9FD1-8F0E06CF1A44.jpg",
    linkedin: "https://www.linkedin.com/in/guncenehir/",
    github: "https://github.com/guncenehir",
  },
  {
    id: 5,
    name: "Nafie Asfour",
    image: "/1668601656647.jpg",
    linkedin: "https://www.linkedin.com/in/nafie-asfour/",
    github: "https://github.com/nafieasfour",
  },
];

function Contributors() {
  return (
    <PageLayout>
      <div className="flex flex-col gap-8 justify-center items-center  pt-24">
        <div>
          <div className="flex flex-col gap-4 justify-center items-center ">
            <h1 className="font-bold text-2xl">Contributors</h1>
            <p className="font-bold text-xl">
              Here are the people who worked on this project
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-4  w-full justify-center items-center    ">
          {contributorsData.map((item) => {
            return (
              <div
                key={item.id}
                className="flex flex-col w-full max-w-sm gap-4  bg-white border border-gray-200 rounded-lg justify-center items-center shadow bg-cyan-900 pt-6 pb-8"
              >
                <div className="relative h-[25svh] w-[25svh]  ">
                  <Image
                    src={item.image}
                    layout="fill"
                    className="rounded-xl drop-shadow-lg"
                    objectFit="cover"
                    alt="Picture of the author"
                  />
                </div>
                <div>
                  <h2 className="text-white text-lg"> {item.name} </h2>
                </div>
                <div className="flex justify-center items-center gap-4">
                  <Link href={item.linkedin}>
                    <LinkedinIcon size={32} round />
                  </Link>
                  <Link href={item.github}>
                    <svg width="28" height="28" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
}

export default Contributors;
