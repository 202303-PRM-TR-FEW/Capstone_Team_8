import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { updateUserProfilePicture, handleUpload } from "@/firebase/firebase";
import { useTranslations } from "next-intl";
import { enqueueSnackbar } from "notistack";
function ChangeProfileImg() {
  const t = useTranslations();
  const [imageUrl, setImageUrl] = useState("");
  const imageSchema = yup.object().shape({
    img: yup.mixed().required(t("image_required")),
  });

  const {
    control: imageControl,
    handleSubmit: imageSubmit,
    register: imageRegister,
    formState: { errors: imageErrors },
  } = useForm({
    resolver: yupResolver(imageSchema),
  });

  const onSubmitImage = () => {
    if (imageUrl && imageUrl.trim().length < 1) {
      enqueueSnackbar(t("image_required"), { variant: "error" });
      return;
    }

    updateUserProfilePicture(imageUrl);
    setImageUrl("");
  };

  const handleFileUpload = async (e) => {
    await handleUpload(e, setImageUrl);
  };

  const getFormErrorMessage = (name) => {
    return errors[name] ? (
      <small className='text-red-600'>{errors[name].message}</small>
    ) : (
      <small className='text-red-600'>&nbsp;</small>
    );
  };
  return (
    <div>
      <div>
        <form onSubmit={imageSubmit(onSubmitImage)}>
          <div className='mb-4'>
            <label className='flex justify-center items-center text-gray-700 text-sm font-bold mb-2'>
              {t("Change Profile Picture")}
            </label>

            <div className='flex flex-col justify-center items-center'>
              <input
                type='file'
                {...imageRegister("img")}
                accept='image/png, image/jpeg, image/jpg'
                onChange={handleFileUpload}
                className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
              <p
                className={`text-red-700 px-3 ${
                  imageErrors.img ? "" : "invisible"
                }`}
              >
                {imageErrors.img?.message || "Placeholder"}
              </p>
            </div>
            <div className=' px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse flex justify-center'>
              <button
                type='submit'
                className=' inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm'
              >
                {t("update_profile_picture")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangeProfileImg;
