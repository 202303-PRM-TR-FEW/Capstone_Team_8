"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  createProject,
  uploadImage,
  updateProject,
  handleUpload,
  register,
} from "@/firebase/firebase";
import { getAuth } from "firebase/auth";
import Image from "next/legacy/image";
import moment from "moment";

// import { SnackbarProvider, enqueueSnackbar } from 'notistack';

function EditProject({ setIsEditProjectOpen, project }) {
  const [imageUrl, setImageUrl] = useState(project.img);
  const defaultValues = {
    title: project.title,
    desc: project.desc,
    goal: project.goal,
    about: project.about,
    endTime: moment(project.endTime.seconds * 1000).toDate(),
    category: project.category,
    img: project.img,
  };

  const auth = getAuth();
  const schema = yup.object().shape({
    title: yup.string().trim().required("Title is required"),
    about: yup
      .string()
      .trim()
      .required("About is required")
      .min(20, "About must be at least 50 characters")
      .max(100, "About cannot be more than 200 characters"),
    desc: yup.string().trim().required("Description is required"),
    goal: yup.number().required("Goal is required"),
    endTime: yup.date().required("End time is required").nullable(),
    img: yup.mixed(),
  });
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });
  const onSubmit = async (data) => {
    try {
      await updateProject(project.id, {
        title: data.title,
        desc: data.desc,
        goal: data.goal,
        about: data.about,
        endTime: data.endTime,
        img: imageUrl,
      });
      setImageUrl("");
      reset();
      setIsEditProjectOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleFileUpload = async (e) => {
    await handleUpload(e, setImageUrl);
    await updateProject(project.id, {
      img: imageUrl,
    });
  };

  return (
    <div className="fixed top-0 left-0 z-10 inset-0 overflow-y-auto w-full pt-16">
      <div className="flex items-center justify-center min-h-screen overflow-auto pt-4 px-4 pb-20 text-center">
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
        <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <form
              className="flex flex-col w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex justify-end items-end">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditProjectOpen(false);
                  }}
                  className="mt-3 inline-flex justify-center rounded-md  px-4 py-2 text-2xl font-medium text-gray-700  focus:outline-none sm:mt-0 sm:ml-3  "
                >
                  X
                </button>
              </div>

              <div className="flex flex-col sm:flex-row w-full gap-4">
                <div className="sm:border-r-2 w-full pr-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Title
                    </label>

                    <div>
                      <input
                        {...register("title")}
                        placeholder="Enter the title of your project"
                        className=" appearance-none border-b-2 border-black  w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <p
                        className={`text-red-700 px-3 ${
                          errors.title ? "" : "invisible"
                        }`}
                      >
                        {errors.title?.message || "Placeholder"}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Description
                    </label>

                    <div>
                      <input
                        placeholder="Enter the description of your project"
                        {...register("desc")}
                        className=" appearance-none border-b-2 border-black  w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <p
                        className={`text-red-700 px-3 ${
                          errors.desc ? "" : "invisible"
                        }`}
                      >
                        {errors.desc?.message || "Placeholder"}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      About Project
                    </label>

                    <div className="w-full">
                      <textarea
                        placeholder="Enter the about part of your project"
                        {...register("about")}
                        className=" appearance-none border-b-2 border-black  w-full py-2  text-black leading-tight focus:outline-none focus:shadow-outline min-h-[5rem]"
                      />
                      <p
                        className={`text-red-700 px-3 ${
                          errors.about ? "" : "invisible"
                        }`}
                      >
                        {errors.about?.message || "Placeholder"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  {" "}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Goal
                    </label>

                    <div>
                      <input
                        type="number"
                        placeholder="Enter the goal amount of your project"
                        {...register("goal")}
                        className=" appearance-none border-b-2 border-black  w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                      />
                      <p
                        className={`text-red-700 px-3 ${
                          errors.goal ? "" : "invisible"
                        }`}
                      >
                        {errors.goal?.message || "Placeholder"}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      End Time
                    </label>

                    <div>
                      <Controller
                        control={control}
                        name="endTime"
                        render={({ field }) => (
                          <DatePicker
                            placeholder="Enter the deadline of your project"
                            className=" appearance-none border-b-2 border-black  w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                            selected={new Date(field.value)}
                            onChange={(date) => field.onChange(moment(date))}
                            dateFormat="dd/MM/yyyy"
                          />
                        )}
                      />
                      <p
                        className={`text-red-700 px-3 ${
                          errors.endTime ? "" : "invisible"
                        }`}
                      >
                        {errors.endTime?.message || "Placeholder"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  <p>Upload Your Picture</p>
                  <p className="opacity-80 text-blue-400">
                    You can only upload image format of png, jpeg, jpg
                  </p>
                </label>

                <div>
                  <input
                    type="file"
                    {...register("img")}
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={handleFileUpload}
                    className=" appearance-none border-b-2 border-black  w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                  />
                  {imageUrl !== "" && <p>The file You Upload</p>}
                  <div className=" relative w-full h-48     ">
                    <Image
                      src={imageUrl}
                      layout="fill"
                      className="rounded "
                      alt="profile-picture"
                    />{" "}
                  </div>

                  <p
                    className={`text-red-700 px-3 ${
                      errors.img ? "" : "invisible"
                    }`}
                  >
                    {errors.img?.message || "Placeholder"}
                  </p>
                </div>
              </div>
              <div className=" px-4  w-full py-3 sm:px-6 flex justify-center">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-lg font-bold text-white  focus:outline-none sm:ml-3  sm:text-sm"
                >
                  Update Project
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProject;