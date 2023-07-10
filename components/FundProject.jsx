"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { handleEdit } from "../firebase/firebase";
import { useRouter } from "next/navigation";

function FundProject({ setIsOpen, projectDetail, projectId }) {
  const schema = yup.object().shape({
    donation: yup.string().trim().required("Donation is required"),
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

  const router = useRouter();
  const onSubmit = async (data) => {
    await handleEdit(projectId, data);
    setIsOpen(false);
    reset();
    router.push("/thankyou");
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
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Enter the Donation Amount:
                </label>
                <Controller
                  name="donation"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <div>
                      <input
                        {...field}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      />
                      {getFormErrorMessage(field.name)}
                    </div>
                  )}
                />
              </div>
              <div className="mb-4">
                <span className="text-black"> Add 2% chartiy?</span>
                <input {...register("checkbox")} type="checkbox" value="A" />
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Fund Project
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
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
