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
		<div className="flex flex-col py-10 px-8 md:py-16 md:px-16 lg:px-20">
            <div className="p-4">
                <h1 className="text-4xl md:text-5xl lg:text-7xl text-center">About Givingly</h1>
            </div>

            <div className="flex flex-col gap-6 md:flex-row md:pt-8 lg:gap-8 lg:flex-row lg:pt-12">
                <div className="flex-1 p-4 shadow-lg">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl text-center">{missionData.title}</h1>
                    <p className="p-2 md:p-4 lg:p-6 text-sm md:text-base lg:text-lg text-justify">{missionData.content}</p>
                </div>

                <div className="flex-1 p-4 shadow-lg">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl text-center">{visionData.title}</h1>
                    <p className="p-2 md:p-4 lg:p-6 text-sm md:text-base lg:text-lg">{visionData.content}</p>
                </div>
            </div>

            <div className='shadow-lg pt-8'>
                <div className='p-8'>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl text-center">Our Values</h1>
                </div>

                <div className='flex flex-row flex-wrap justify-center gap-2 p-2 md:justify-between lg:gap-6 lg:p-4  divide-x'> 

                    <div className="flex-1 p-4 ">
                        <h1 className="text-xl md:text-xl lg:text-2xl text-center">Respect for Individuals</h1>
                        <p className="p-2 md:p-4 lg:p-6 text-sm md:text-base lg:text-lg text-justify">We believe in the potential of every individual and strive to support them in realizing their dreams.</p>
                    </div>
                    <div className="flex-1 p-4 ">
                        <h1 className="text-xl md:text-xl lg:text-2xl text-center">Service to the Community</h1>
                        <p className="p-2 md:p-4 lg:p-6 text-sm md:text-base lg:text-lg text-justify">We prioritize projects that add value to society and take on the responsibility of spreading goodwill.</p>
                    </div>
                    <div className="flex-1 p-4 ">
                        <h1 className="text-xl md:text-xl lg:text-2xl text-center">Transparency</h1>
                        <p className="p-2 md:p-4 lg:p-6 text-sm md:text-base lg:text-lg text-justify">We establish a reliable bridge between donors and projects through open communication and transparent processes.</p>
                    </div>
                    <div className="flex-1 p-4 ">
                        <h1 className="text-xl md:text-xl lg:text-2xl text-center">Goodness and Enthusiasm</h1>
                        <p className="p-2 md:p-4 lg:p-6 text-sm md:text-base lg:text-lg text-justify">We believe in the power of kindness and reflect the enthusiasm of the Givingly family in our projects.</p>
                    </div>

                </div>
            </div>



            
        </div>

	</PageLayout>

	)
}

export default About;
