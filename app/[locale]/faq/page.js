"use client";
import React, { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { useTranslations, useLocale } from "next-intl";

function Faq() {
  const locale = useLocale();
  const t = useTranslations();
  const [openSection, setOpenSection] = useState(null);
  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };
  return (
    <PageLayout>
      <div className="flex flex-col justify-center items-start py-24 gap-4 sm:min-h-[95vh] min-h-[95svh] px-4 sm:px-6 w-screen">
        <h1 className="text-left text-2xl font-bold pb-4">
          {t("most_popular_questions")}
        </h1>

        <div className="border-2 border-gray-20 w-full flex flex-col justify-start rounded">
          <div className="flex justify-between px-2">
            {" "}
            <button
              className="w-full px-5 py-3 outline-none focus:outline-none"
              onClick={() => toggleSection("section1")}
            >
              <p className="font-semibold text-left w-full ">{t("faq_q1")}</p>
            </button>
            {openSection == "section1" ? (
              <button className="text-2xl">-</button>
            ) : (
              <button className="text-2xl">+</button>
            )}
          </div>

          {openSection === "section1" && (
            <div className="p-5  border-gray-200 flex justify-start w-full border-t-2">
              <p className="w-full text-left">{t("faq_a1")}</p>
            </div>
          )}
        </div>
        <div className="border-2 border-gray-20 w-full flex flex-col justify-start rounded">
          <div className="flex justify-between px-2">
            {" "}
            <button
              className="w-full px-5 py-3 outline-none focus:outline-none"
              onClick={() => toggleSection("section2")}
            >
              <p className="font-semibold text-left w-full ">{t("faq_q2")}</p>
            </button>
            {openSection == "section2" ? (
              <button className="text-2xl">-</button>
            ) : (
              <button className="text-2xl">+</button>
            )}
          </div>

          {openSection === "section2" && (
            <div className="p-5  border-gray-200 flex justify-start w-full border-t-2">
              <p className="w-full text-left">{t("faq_a2")}</p>
            </div>
          )}
        </div>

        <div className="border-2 border-gray-20 w-full flex flex-col justify-start rounded">
          <div className="flex justify-between px-2">
            {" "}
            <button
              className="w-full px-5 py-3 outline-none focus:outline-none"
              onClick={() => toggleSection("section3")}
            >
              <p className="font-semibold text-left w-full ">
                Q3: What types of projects can I crowdfund?
              </p>
            </button>
            {openSection == "section3" ? (
              <button className="text-2xl">-</button>
            ) : (
              <button className="text-2xl">+</button>
            )}
          </div>

          {openSection === "section3" && (
            <div className="p-5  border-gray-200 flex justify-start w-full border-t-2">
              <p className="w-full text-left">
                A: Crowdfunding is versatile and can be used for various
                projects, including startups, creative ventures, charitable
                causes, product development, and more. It is essential to choose
                a platform that aligns with your project type.
              </p>
            </div>
          )}
        </div>

        <div className="border-2 border-gray-20 w-full flex flex-col justify-start rounded">
          <div className="flex justify-between px-2">
            {" "}
            <button
              className="w-full px-5 py-3 outline-none focus:outline-none"
              onClick={() => toggleSection("section4")}
            >
              <p className="font-semibold text-left w-full ">
                Q4: Is crowdfunding safe?
              </p>
            </button>
            {openSection == "section4" ? (
              <button className="text-2xl">-</button>
            ) : (
              <button className="text-2xl">+</button>
            )}
          </div>

          {openSection === "section4" && (
            <div className="p-5  border-gray-200 flex justify-start w-full border-t-2">
              <p className="w-full text-left">
                A: Crowdfunding platforms prioritize security and safety. They
                use encrypted payment gateways to protect your financial
                information. However, backers should be aware that crowdfunding
                carries inherent risks, and projects may not always deliver as
                planned.
              </p>
            </div>
          )}
        </div>

        <div className="border-2 border-gray-20 w-full flex flex-col justify-start rounded">
          <div className="flex justify-between px-2">
            {" "}
            <button
              className="w-full px-5 py-3 outline-none focus:outline-none"
              onClick={() => toggleSection("section5")}
            >
              <p className="font-semibold text-left w-full ">
                Q5: Can I get a refund if a project I backed does not succeed?
              </p>
            </button>
            {openSection == "section5" ? (
              <button className="text-2xl">-</button>
            ) : (
              <button className="text-2xl">+</button>
            )}
          </div>

          {openSection === "section5" && (
            <div className="p-5  border-gray-200 flex justify-start w-full border-t-2">
              <p className="w-full text-left">
                A: It depends on the crowdfunding platform and the projects
                specific terms. In some cases, backers may receive a refund if
                the funding goal is not met, while others might have a
                all-or-nothing policy.
              </p>
            </div>
          )}
        </div>

        <div className="border-2 border-gray-20 w-full flex flex-col justify-start rounded">
          <div className="flex justify-between px-2">
            {" "}
            <button
              className="w-full px-5 py-3 outline-none focus:outline-none"
              onClick={() => toggleSection("section6")}
            >
              <p className="font-semibold text-left w-full ">
                Q6: How do I create a successful crowdfunding campaign?
              </p>
            </button>
            {openSection == "section6" ? (
              <button className="text-2xl">-</button>
            ) : (
              <button className="text-2xl">+</button>
            )}
          </div>

          {openSection === "section6" && (
            <div className="p-5  border-gray-200 flex justify-start w-full border-t-2">
              <p className="w-full text-left">
                A: To create a successful campaign, be clear about your projects
                purpose, set realistic funding goals, provide compelling
                rewards, and engage with your backers through regular updates.
              </p>
            </div>
          )}
        </div>

        <div className="border-2 border-gray-20 w-full flex flex-col justify-start rounded">
          <div className="flex justify-between px-2">
            {" "}
            <button
              className="w-full px-5 py-3 outline-none focus:outline-none"
              onClick={() => toggleSection("section7")}
            >
              <p className="font-semibold text-left w-full ">
                Q7: Can I change my reward selection after I have backed a
                project?
              </p>
            </button>
            {openSection == "section7" ? (
              <button className="text-2xl">-</button>
            ) : (
              <button className="text-2xl">+</button>
            )}
          </div>

          {openSection === "section7" && (
            <div className="p-5  border-gray-200 flex justify-start w-full border-t-2">
              <p className="w-full text-left">
                A: Most crowdfunding platforms allow backers to change their
                reward selection before the campaign ends. Check the platforms
                guidelines for specific details and more information about our
                campaign
              </p>
            </div>
          )}
        </div>

        <div className="border-2 border-gray-20 w-full flex flex-col justify-start rounded">
          <div className="flex justify-between px-2">
            {" "}
            <button
              className="w-full px-5 py-3 outline-none focus:outline-none"
              onClick={() => toggleSection("section8")}
            >
              <p className="font-semibold text-left w-full ">
                Q8: What happens if a project I backed does not deliver as
                promised?
              </p>
            </button>
            {openSection == "section8" ? (
              <button className="text-2xl">-</button>
            ) : (
              <button className="text-2xl">+</button>
            )}
          </div>

          {openSection === "section8" && (
            <div className="p-5  border-gray-200 flex justify-start w-full border-t-2">
              <p className="w-full text-left">
                A: While crowdfunding platforms strive to ensure project
                legitimacy, there is always a possibility of delays or
                unforeseen challenges. If you encounter such issues, try to
                communicate with the project creator first. If necessary,
                contact the platforms support for further assistance.
              </p>
            </div>
          )}
        </div>

        <div className="border-2 border-gray-20 w-full flex flex-col justify-start rounded">
          <div className="flex justify-between px-2">
            {" "}
            <button
              className="w-full px-5 py-3 outline-none focus:outline-none"
              onClick={() => toggleSection("section9")}
            >
              <p className="font-semibold text-left w-full ">
                Q9: Can I cancel my pledge during a crowdfunding campaign?
              </p>
            </button>
            {openSection == "section9" ? (
              <button className="text-2xl">-</button>
            ) : (
              <button className="text-2xl">+</button>
            )}
          </div>

          {openSection === "section9" && (
            <div className="p-5  border-gray-200 flex justify-start w-full border-t-2">
              <p className="w-full text-left">
                A: No, in most cases, backers can not cancel their pledges
                before the campaign ends. However, double-check the platforms
                rules as they may vary. You may also contact us by email to
                resolve your issues.
              </p>
            </div>
          )}
        </div>

        <div className="border-2 border-gray-20 w-full flex flex-col justify-start rounded">
          <div className="flex justify-between px-2">
            {" "}
            <button
              className="w-full px-5 py-3 outline-none focus:outline-none"
              onClick={() => toggleSection("section10")}
            >
              <p className="font-semibold text-left w-full ">
                Q10: How do I contact the project creator for more information?
              </p>
            </button>
            {openSection == "section10" ? (
              <button className="text-2xl">-</button>
            ) : (
              <button className="text-2xl">+</button>
            )}
          </div>

          {openSection === "section10" && (
            <div className="p-5  border-gray-200 flex justify-start w-full border-t-2">
              <p className="w-full text-left">
                A: On most crowdfunding platforms, there is a messaging system
                that allows backers to communicate with the project creator
                directly. You can use this feature to ask questions or seek
                additional information about the project.
              </p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}

export default Faq;
