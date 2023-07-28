"use client";
import React, { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { auth } from "../firebase/firebase";
import * as yup from "yup";
import { handleEdit } from "../firebase/firebase";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next-intl/client";

function FundProject({ setIsOpen, projectId, totalAmount, projectDetail }) {
  const locale = useLocale();
  const ref = useRef(null);
  const t = useTranslations();

  const remaining = parseFloat(
    parseFloat(Number(projectDetail.goal)) - parseFloat(Number(totalAmount))
  );
  const schema = yup.object().shape({
    donation: yup
      .number()
      .required(t("donation_required"))
      .max(remaining, t("donation_max")),
  });
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  const router = useRouter();
  const onSubmit = async (data) => {
    await handleEdit(projectId, data);
    setIsOpen(false);
    reset();

    router.push(`/thankyou/${projectId}`, { locale: locale });
  };

  const getFormErrorMessage = (name) => {
    return errors[name] ? (
      <small className="text-red-600">{errors[name].message}</small>
    ) : (
      <small className="text-red-600">&nbsp;</small>
    );
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto w-full">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block  align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div
            ref={ref}
            className="bg-white px-12 pt-2 pb-16  flex flex-col w-full"
          >
            <div className="flex justify-end items-end">
              {" "}
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                }}
                className="mt-3  inline-flex justify-center rounded-md    px-4 py-2  text-lg font-bold text-gray-700  focus:outline-none   "
              >
                <svg
                  height="25px"
                  id="Layer_1"
                  version="1.1"
                  viewBox="0 0 512 512"
                  width="25px"
                >
                  <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
                </svg>
              </button>
            </div>

            <form
              className="flex flex-col gap-20"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="relative mb-4">
                <label className="block text-black text-2xl font-bold mb-8">
                  {t("donation")} <br /> {t("amount")}
                </label>

                <div>
                  <input
                    type="number"
                    placeholder={t("donation_placeholder")}
                    {...register("donation")}
                    className="appearance-none border-b-2 border-black w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline"
                  />
                  <div className="absolute top-[108px] right-[410px] ">
                    <svg
                      height="18px"
                      width="18px"
                      version="1.1"
                      viewBox="0 0 235.517 235.517"
                    >
                      <g>
                        <path
                          fill="#010002"
                          d="M118.1,235.517c7.898,0,14.31-6.032,14.31-13.483c0-7.441,0-13.473,0-13.473
		c39.069-3.579,64.932-24.215,64.932-57.785v-0.549c0-34.119-22.012-49.8-65.758-59.977V58.334c6.298,1.539,12.82,3.72,19.194,6.549
		c10.258,4.547,22.724,1.697,28.952-8.485c6.233-10.176,2.866-24.47-8.681-29.654c-11.498-5.156-24.117-8.708-38.095-10.236V8.251
		c0-4.552-6.402-8.251-14.305-8.251c-7.903,0-14.31,3.514-14.31,7.832c0,4.335,0,7.843,0,7.843
		c-42.104,3.03-65.764,25.591-65.764,58.057v0.555c0,34.114,22.561,49.256,66.862,59.427v33.021
		c-10.628-1.713-21.033-5.243-31.623-10.65c-11.281-5.755-25.101-3.72-31.938,6.385c-6.842,10.1-4.079,24.449,7.294,30.029
		c16.709,8.208,35.593,13.57,54.614,15.518v13.755C103.79,229.36,110.197,235.517,118.1,235.517z M131.301,138.12
		c14.316,4.123,18.438,8.257,18.438,15.681v0.555c0,7.979-5.776,12.651-18.438,14.033V138.12z M86.999,70.153v-0.549
		c0-7.152,5.232-12.657,18.71-13.755v29.719C90.856,81.439,86.999,77.305,86.999,70.153z"
                        />
                      </g>
                    </svg>
                  </div>
                  <p
                    className={`text-red-700 px-3 ${
                      errors.donation ? "" : "invisible"
                    }`}
                  >
                    {errors.donation?.message || "Placeholder"}
                  </p>
                </div>
              </div>

              <div className=" px-4 py-3 sm:px-6 flex w-full justify-center ">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-6 py-2 bg-black text-xl font-medium text-white  focus:outline-none sm:ml-3  "
                >
                  {t("fund_project")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FundProject;
