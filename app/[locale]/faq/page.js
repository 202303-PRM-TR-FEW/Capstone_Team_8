import React from "react";
import PageLayout from "@/components/PageLayout";

function Faq() {
  return (
    <PageLayout>
      <div className="flex flex-col justify-center items-center py-24 gap-4 sm:min-h-[95vh] min-h-[95svh] px-4 sm:px-6 ">
        <div className="flex flex-col gap-2 border-2 p-2 rounded drop-shadow-lg">
          <h2 className="text-xl">Q1: What is crowdfunding?</h2>
          <p className="pl-2">
            A: Crowdfunding is a method of raising funds for a project,
            business, or cause by collecting small contributions from a large
            number of people through an online platform.
          </p>
        </div>
        <div className="flex flex-col gap-2 border-2 p-2 rounded drop-shadow-lg ">
          <h2 className="text-xl">Q2: How does crowdfunding work?</h2>
          <p className="pl-2">
            A: In crowdfunding, project creators set a funding goal and offer
            rewards or incentives to backers who contribute money to support the
            project. If the funding goal is reached within a specified
            timeframe, the project is funded, and backers receive their rewards.
          </p>
        </div>
        <div className="flex flex-col gap-2 border-2 p-2 rounded drop-shadow-lg ">
          <h2 className="text-xl">
            Q3: What types of projects can I crowdfund?
          </h2>
          <p className="pl-2">
            A: Crowdfunding is versatile and can be used for various projects,
            including startups, creative ventures, charitable causes, product
            development, and more. It is essential to choose a platform that
            aligns with your project type.
          </p>
        </div>
        <div className="flex flex-col gap-2 border-2 p-2 rounded drop-shadow-lg ">
          <h2 className="text-xl">Q4: Is crowdfunding safe?</h2>
          <p className="pl-2">
            A: Crowdfunding platforms prioritize security and safety. They use
            encrypted payment gateways to protect your financial information.
            However, backers should be aware that crowdfunding carries inherent
            risks, and projects may not always deliver as planned.
          </p>
        </div>
        <div className="flex flex-col gap-2 border-2 p-2 rounded drop-shadow-lg ">
          <h2 className="text-xl">
            Q5: Can I get a refund if a project I backed does not succeed?
          </h2>
          <p className="pl-2">
            A: It depends on the crowdfunding platform and the projects specific
            terms. In some cases, backers may receive a refund if the funding
            goal is not met, while others might have a all-or-nothing policy.
          </p>
        </div>

        <div className="flex flex-col gap-2 border-2 p-2 rounded drop-shadow-lg ">
          <h2 className="text-xl">
            Q6: How do I create a successful crowdfunding campaign?
          </h2>
          <p className="pl-2">
            A: To create a successful campaign, be clear about your projects
            purpose, set realistic funding goals, provide compelling rewards,
            and engage with your backers through regular updates.
          </p>
        </div>

        <div className="flex flex-col gap-2 border-2 p-2 rounded drop-shadow-lg ">
          <h2 className="text-xl">
            Q7: Can I change my reward selection after I have backed a project?
          </h2>
          <p className="pl-2">
            A: Most crowdfunding platforms allow backers to change their reward
            selection before the campaign ends. Check the platforms guidelines
            for specific details and more information about our campaign
          </p>
        </div>

        <div className="flex flex-col gap-2 border-2 p-2 rounded drop-shadow-lg ">
          <h2 className="text-xl">
            Q8: What happens if a project I backed does not deliver as promised?
          </h2>
          <p className="pl-2">
            A: While crowdfunding platforms strive to ensure project legitimacy,
            there is always a possibility of delays or unforeseen challenges. If
            you encounter such issues, try to communicate with the project
            creator first. If necessary, contact the platforms support for
            further assistance.
          </p>
        </div>

        <div className="flex flex-col gap-2 border-2 p-2 rounded drop-shadow-lg ">
          <h2 className="text-xl">
            Q9: Can I cancel my pledge during a crowdfunding campaign?
          </h2>
          <p className="pl-2">
            A: No, in most cases, backers can not cancel their pledges before
            the campaign ends. However, double-check the platforms rules as they
            may vary. You may also contact us by email to resolve your issues.
          </p>
        </div>

        <div className="flex flex-col gap-2 border-2 p-2 rounded drop-shadow-lg ">
          <h2 className="text-xl">
            Q10: How do I contact the project creator for more information?
          </h2>
          <p className="pl-2">
            A: On most crowdfunding platforms, there is a messaging system that
            allows backers to communicate with the project creator directly. You
            can use this feature to ask questions or seek additional information
            about the project.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}

export default Faq;
