import { fetchDocById } from "../../../firebase/firebase";
import PageLayout from "@/components/pageLayout";
import Image from "next/image";
import Link from "next/link";
export default async function ProjectDetail({ params }) {
  if (!params || !params.id) {
    return <div>Error: Missing user ID</div>;
  }
  const projectDetail = await fetchDocById(params.id);

  return (
    <PageLayout>
      <section className="flex  flex-col   justify-center   h-full    md:px-12 px-6 py-24  w-full ">
        <div className="grid grid-cols-12 gap-8  justify-center items-center w-full ">
          <div className=" relative  lg:h-[70vh] w-full h-full  lg:col-span-4 flex col-span-12 ">
            <img src={projectDetail?.img} alt="projectImage" />
          </div>

          <div className="flex flex-col  content-around lg:col-span-8 col-span-12 gap-2 sm:gap-4 md:gap-10">
            <div className="p-2  lg:p-6  flex flex-col gap-4 lg:gap-8">
              <h1>{projectDetail.title}</h1>
              <p>{projectDetail.desc} </p>
            </div>
            <div className="grid grid-cols-12   ">
              <div className="w-full col-span-12 p-2  lg:p-6  sm:col-span-6 border-solid sm:border-t-2 border-b-2 border-black">
                About Section
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Quae, consequatur quo minus mollitia voluptatibus unde eos
                  ipsum dignissimos. Aliquid ut dicta veritatis adipisci,
                  eligendi corporis nemo, impedit modi voluptate, velit vero
                  assumenda.
                </p>
              </div>
              {/* <div className='border-solid border-l-4 border-black'></div> */}

              <div className="border-solid sm:border-l-2 border-y-2 p-2  lg:p-6  border-black col-span-12 sm:col-span-6 order-first sm:order-2">
                <div className=" w-full flex flex-col gap-2 text-sm     ">
                  <div className="flex flex-col self-center justify-self-center">
                    <div className="grid grid-cols-12">
                      <span className="col-span-11">Raised</span>{" "}
                      <span className="col-span-1">Goal:</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded">
                      <div className="h-2 w-1/2 bg-[#d4ee26] rounded"></div>
                    </div>
                    <div className="grid grid-cols-12">
                      <span className="col-span-11">$2.500</span>{" "}
                      <span className="col-span-1">$3500</span>
                    </div>
                    <div>Days Left</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Link
                className="block py-2 pl-3 pr-4 text-center lg:w-1/2 w-full bg-gray-900 text-white rounded  hover:drop-shadow-xl hover:text-[#d4ee26]  "
                href="/"
              >
                Fund This project
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
