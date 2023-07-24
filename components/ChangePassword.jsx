import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { updateUserPassword } from "@/firebase/firebase";
import { useTranslations } from "next-intl";

function ChangePassword() {
  const t = useTranslations();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const passwordSchema = yup.object().shape({
    password: yup
      .string()
      .trim(t("white_space"))
      .required(t("password_required"))
      .min(6, t("password_min_length")),
    repeatpassword: yup
      .string()
      .trim(t("white_space"))
      .required(t("password_required"))
      .oneOf([yup.ref("password"), null], t("passwords_must_match")),
  });
  const {
    control: passwordControl,
    handleSubmit: passwordSubmit,
    register: passwordRegister,
    reset,
    formState: { errors: passwordErrors },
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });
  const onSubmitPassword = (data) => {
    updateUserPassword(data.password);

    reset();
  };
  const getFormErrorMessage = (name) => {
    return errors[name] ? (
      <small className='text-red-600'>{errors[name].message}</small>
    ) : (
      <small className='text-red-600'>&nbsp;</small>
    );
  };
  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword((prev) => !prev);
    } else if (field === "repeatpassword") {
      setShowRepeatPassword((prev) => !prev);
    }
  };
  return (
    <div>
      <div className='flex justify-center items-center'>
        <p className='pb-4'>{t("password_requirements")}</p>
      </div>
      <form
        className='flex flex-col justify-center items-center'
        onSubmit={passwordSubmit(onSubmitPassword)}
      >
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            {t("Password")}
          </label>

          <div className='relative'>
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t("Password")}
              {...passwordRegister("password")}
              className='shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
            <div
              className='absolute top-2 right-3 cursor-pointer'
              onClick={() => togglePasswordVisibility("password")}
            >
              <svg
                fill='#000000'
                version='1.1'
                id='Capa_1'
                width='18px'
                height='18px'
                viewBox='0 0 442.04 442.04'
              >
                <g>
                  <g>
                    <path
                      d='M221.02,341.304c-49.708,0-103.206-19.44-154.71-56.22C27.808,257.59,4.044,230.351,3.051,229.203
			c-4.068-4.697-4.068-11.669,0-16.367c0.993-1.146,24.756-28.387,63.259-55.881c51.505-36.777,105.003-56.219,154.71-56.219
			c49.708,0,103.207,19.441,154.71,56.219c38.502,27.494,62.266,54.734,63.259,55.881c4.068,4.697,4.068,11.669,0,16.367
			c-0.993,1.146-24.756,28.387-63.259,55.881C324.227,321.863,270.729,341.304,221.02,341.304z M29.638,221.021
			c9.61,9.799,27.747,27.03,51.694,44.071c32.83,23.361,83.714,51.212,139.688,51.212s106.859-27.851,139.688-51.212
			c23.944-17.038,42.082-34.271,51.694-44.071c-9.609-9.799-27.747-27.03-51.694-44.071
			c-32.829-23.362-83.714-51.212-139.688-51.212s-106.858,27.85-139.688,51.212C57.388,193.988,39.25,211.219,29.638,221.021z'
                    />
                  </g>
                  <g>
                    <path
                      d='M221.02,298.521c-42.734,0-77.5-34.767-77.5-77.5c0-42.733,34.766-77.5,77.5-77.5c18.794,0,36.924,6.814,51.048,19.188
			c5.193,4.549,5.715,12.446,1.166,17.639c-4.549,5.193-12.447,5.714-17.639,1.166c-9.564-8.379-21.844-12.993-34.576-12.993
			c-28.949,0-52.5,23.552-52.5,52.5s23.551,52.5,52.5,52.5c28.95,0,52.5-23.552,52.5-52.5c0-6.903,5.597-12.5,12.5-12.5
			s12.5,5.597,12.5,12.5C298.521,263.754,263.754,298.521,221.02,298.521z'
                    />
                  </g>
                  <g>
                    <path d='M221.02,246.021c-13.785,0-25-11.215-25-25s11.215-25,25-25c13.786,0,25,11.215,25,25S234.806,246.021,221.02,246.021z' />
                  </g>
                </g>
              </svg>
            </div>
            <p
              className={`text-red-700 px-3 ${
                passwordErrors.password ? "" : "invisible"
              }`}
            >
              {passwordErrors.password?.message || "Placeholder"}
            </p>
          </div>
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2'>
            {t("repeat_password")}
          </label>

          <div className='relative'>
            <input
              type={showRepeatPassword ? "text" : "password"}
              placeholder={t("repeat_password")}
              {...passwordRegister("repeatpassword")}
              className='shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
            <div
              className='absolute top-2 right-3 cursor-pointer'
              onClick={() => togglePasswordVisibility("repeatpassword")}
            >
              <svg
                fill='#000000'
                version='1.1'
                id='Capa_1'
                width='18px'
                height='18px'
                viewBox='0 0 442.04 442.04'
              >
                <g>
                  <g>
                    <path
                      d='M221.02,341.304c-49.708,0-103.206-19.44-154.71-56.22C27.808,257.59,4.044,230.351,3.051,229.203
			c-4.068-4.697-4.068-11.669,0-16.367c0.993-1.146,24.756-28.387,63.259-55.881c51.505-36.777,105.003-56.219,154.71-56.219
			c49.708,0,103.207,19.441,154.71,56.219c38.502,27.494,62.266,54.734,63.259,55.881c4.068,4.697,4.068,11.669,0,16.367
			c-0.993,1.146-24.756,28.387-63.259,55.881C324.227,321.863,270.729,341.304,221.02,341.304z M29.638,221.021
			c9.61,9.799,27.747,27.03,51.694,44.071c32.83,23.361,83.714,51.212,139.688,51.212s106.859-27.851,139.688-51.212
			c23.944-17.038,42.082-34.271,51.694-44.071c-9.609-9.799-27.747-27.03-51.694-44.071
			c-32.829-23.362-83.714-51.212-139.688-51.212s-106.858,27.85-139.688,51.212C57.388,193.988,39.25,211.219,29.638,221.021z'
                    />
                  </g>
                  <g>
                    <path
                      d='M221.02,298.521c-42.734,0-77.5-34.767-77.5-77.5c0-42.733,34.766-77.5,77.5-77.5c18.794,0,36.924,6.814,51.048,19.188
			c5.193,4.549,5.715,12.446,1.166,17.639c-4.549,5.193-12.447,5.714-17.639,1.166c-9.564-8.379-21.844-12.993-34.576-12.993
			c-28.949,0-52.5,23.552-52.5,52.5s23.551,52.5,52.5,52.5c28.95,0,52.5-23.552,52.5-52.5c0-6.903,5.597-12.5,12.5-12.5
			s12.5,5.597,12.5,12.5C298.521,263.754,263.754,298.521,221.02,298.521z'
                    />
                  </g>
                  <g>
                    <path d='M221.02,246.021c-13.785,0-25-11.215-25-25s11.215-25,25-25c13.786,0,25,11.215,25,25S234.806,246.021,221.02,246.021z' />
                  </g>
                </g>
              </svg>
            </div>
            <p
              className={`text-red-700 px-3 ${
                passwordErrors.repeatpassword ? "" : "invisible"
              }`}
            >
              {passwordErrors.repeatpassword?.message || "Placeholder"}
            </p>
          </div>
        </div>

        <div className=' px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse flex justify-center'>
          <button
            type='submit'
            className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm'
          >
            {t("change_password")}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
