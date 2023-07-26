import React from 'react';
import PageLayout from '@/components/PageLayout';

const missionData = {
    title: 'Our Mission',
    content:
      'Givingly provides a powerful platform for people to realize their dreams and contribute value to society. Our aim is to support projects focusing on vital sectors such as education, animals, children, and culture, ensuring their success. Givingly fosters a connection between donors and projects, enabling the exploration of society\'s beauties and growth together.',
  };
  
  const visionData = {
    title: 'Our Vision',
    content:
      'Givingly is a pioneering crowdfunding platform that unites the power of global communities to bring goodwill-focused projects to life. Our vision is to create a future that is fair, educated, healthy, and culturally enriched.',
  };
  
  


function About() {
	return (
	<PageLayout>
		<div className="flex flex-col py-16 px-12 md:py-20 md:px-20 lg:px-28">
            <div className="p-8">
                <h1 className="text-4xl md:text-5xl lg:text-7xl text-center">About Givingly</h1>
            </div>

            <div className="flex flex-col gap-6 md:flex-row md:pt-8 lg:gap-8 lg:flex-col lg:pt-12">
                <div className="flex-1 p-4 shadow-lg">

                    <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold">{missionData.title}</h1>
                    <div className="flex justify-center items-center">
                        <img
                            src="https://www.svgrepo.com/show/477511/target-and-arrow.svg"
                            alt=" Our Mission Icon"
                            className="h-20 w-20 md:h-24 md:w-24 lg:h-32 lg:w-32"
                        />
                    </div>
                    <p className="p-2 md:p-4 lg:p-6 text-sm md:text-base lg:text-lg text-justify">{missionData.content}</p>
                </div>

                <div className="flex-1 p-4 shadow-lg">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold">{visionData.title}</h1>

                    <div className="flex justify-center items-center">
                        <img
                            src="https://www.svgrepo.com/show/447665/idea-bulb-glow.svg"
                            alt="Our Vision Icon"
                            className="h-20 w-20 md:h-24 md:w-24 lg:h-32 lg:w-32"                        />
                    </div>
                    <p className="p-2 md:p-4 lg:p-6 text-sm md:text-base lg:text-lg text-justify">{visionData.content}</p>
                </div>
            </div>


            <div className="p-8 pt-12 shadow-lg">

            <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold">Our Values</h1><br></br>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 shadow-md">
                <h1 className="text-xl md:text-xl lg:text-3xl text-center ">Respect for Individuals</h1>
                <div className="flex justify-center items-center">
                            <img
                                src="https://www.svgrepo.com/show/307123/spotlight-stage-celebrity-famous.svg"
                                alt=" Respect for Individuals Icon"
                                className="h-20 w-20 md:h-24 md:w-24 lg:h-32 lg:w-32"
                            />
                        </div>
                <p className="p-2 md:p-4 lg:p-6 text-sm md:text-base lg:text-lg text-justify">
                    We believe in the potential of every individual and strive to support them in realizing their dreams.
                </p>
              </div>
              <div className="p-4 shadow-md">
                <h1 className="text-xl md:text-xl lg:text-3xl text-center ">Service to the Community</h1>
                <div className="flex justify-center items-center">
                    <img
                        src="https://www.svgrepo.com/show/307344/happy-crowd-happy-happiness-content.svg"
                        alt=" Service to the Community Icon"
                        className="h-20 w-20 md:h-24 md:w-24 lg:h-32 lg:w-32"
                    />
                </div>
                <p className="p-2 md:p-4 lg:p-6 text-sm md:text-base lg:text-lg text-justify">
                We prioritize projects that add value to society and take on the responsibility of spreading goodwill.
                </p>
              </div>
              <div className="p-4 shadow-md">
                <h1 className="text-xl md:text-xl lg:text-3xl text-center ">Transparency</h1>
                <div className="flex justify-center items-center">
                    <img
                        src="https://www.svgrepo.com/show/307244/conversation-confer-consult-speak.svg"
                        alt=" Transparency Icon"
                        className="h-20 w-20 md:h-24 md:w-24 lg:h-32 lg:w-32"
                    />
                </div>
                <p className="p-2 md:p-4 lg:p-6 text-sm md:text-base lg:text-lg text-justify">
                    We establish a reliable bridge between donors and projects through open communication and transparent processes.
                </p>
              </div>
              <div className="p-4 shadow-md">
                <h1 className="text-xl md:text-xl lg:text-3xl text-center ">Goodness and Enthusiasm</h1>
                <div className="flex justify-center items-center">
                    <img
                        src="https://www.svgrepo.com/show/307382/joy-joyful-enjoy.svg"
                        alt=" Goodness and Enthusiasm Icon"
                        className="h-20 w-20 md:h-24 md:w-24 lg:h-32 lg:w-32"
                    />
                </div>
                <p className="p-2 md:p-4 lg:p-6 text-sm md:text-base lg:text-lg text-justify">
                We believe in the power of kindness and reflect the enthusiasm of the Givingly family in our projects.
                </p>
              </div>

              </div>
              </div>
            <div className=" pt-16">

            <h1 className="text-4xl md:text-5xl lg:text-6xl text-center">Why Givingly?</h1><br></br>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 shadow-lg">
                <h1 className="text-xl md:text-xl lg:text-3xl text-center italic">Diversity and Inclusion</h1>
                <div className="flex justify-center items-center">
                  <img
                    src="https://www.svgrepo.com/show/307234/compare-and-contrast-difference-compare-different.svg"
                    alt="Diversity and Inclusion Icon"
                    className="h-20 w-20 md:h-24 md:w-24 lg:h-32 lg:w-32"
                  />
                </div>
                <p className="p-2 md:p-4 lg:p-6 text-sm md:text-base lg:text-lg text-justify">
                  Givingly supports projects in various fields such as education, animals, children, and cultural heritage, bringing people from all walks of life together. Every donor has the chance to support a project that aligns with their values and interests.
                </p>
              </div>
              <div className="p-4 shadow-lg">
                <h1 className="text-xl md:text-xl lg:text-3xl text-center italic">Network of Goodness</h1>
                <div className="flex justify-center items-center">
                  <img
                    src="https://www.svgrepo.com/show/307233/community-people-friends-group.svg"
                    alt="Network of Goodness Icon"
                    className="h-16 w-16 md:h-20 md:w-20 lg:h-28 lg:w-28"
                  />
                </div>
                <p className="p-2 md:p-4 lg:p-6 text-sm md:text-base lg:text-lg text-justify">
                  Givingly builds a robust community of donors and supporters. Kind-hearted individuals can easily connect with projects that they wish to see come to fruition and provide them with support.
                </p>
              </div>
              <div className="p-4 shadow-lg">
                <h1 className="text-xl md:text-xl lg:text-3xl text-center italic">Transparency and Reliability</h1>
                <div className="flex justify-center items-center">
                  <img
                    src="https://www.svgrepo.com/show/247603/hand-shake-handshake.svg"
                    alt="Transparency and Reliability Icon"
                    className="h-20 w-20 md:h-24 md:w-24 lg:h-32 lg:w-32"
                  />
                </div>
                <p className="p-2 md:p-4 lg:p-6 text-sm md:text-base lg:text-lg text-justify">
                  Givingly employs a rigorous evaluation process to ensure the credibility and potential success of projects. Donors can be confident that their contributions are used for valuable purposes.
                </p>
              </div>
              <div className="p-4 shadow-lg">
                <h1 className="text-xl md:text-xl lg:text-3xl text-center italic">Impact-driven Results</h1>
                <div className="flex justify-center items-center">
                  <img
                    src="https://www.svgrepo.com/show/247615/analytics.svg"
                    alt="Impact-driven Results Icon"
                    className="h-20 w-20 md:h-24 md:w-24 lg:h-32 lg:w-32"
                  />
                </div>
                <p className="p-2 md:p-4 lg:p-6 text-sm md:text-base lg:text-lg text-justify">
                  Givingly monitors and reports the real impact and contributions of projects to society. By sharing the stories and outcomes of projects that have succeeded with the support of donors, we contribute to positive change.
                </p>
              </div>

              </div>
            </div>

              <div className="flex flex-col items-center py-6 px-4 md:py-8 md:px-4 lg:px-20 pt-16">
                    <div className="mb-4">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl text-center">How Can You Support?</h1>
                    </div>

                    <div className="mb-4">
                        <img
                            src="https://www.svgrepo.com/show/307408/mutual-love-reciprocity-relationship-kindness.svg"
                            alt="How Can You Support Icon"
                            className="h-20 w-20 md:h-24 md:w-24 lg:h-32 lg:w-32"
                        />
                    </div>

                    <div className="text-center px-2 md:px-6 lg:px-20">
                        <p className="text-sm md:text-base lg:text-lg text-justify">
                            By joining Givingly, you can become a part of life-changing projects in fields such as education, animals, children, and cultural heritage. By making donations and supporting project dissemination and realization, you can become a vital part of a mission that contributes value to society.
                        </p>
                    </div>
                </div>

        

        </div>

	</PageLayout>

	)
}

export default About;
