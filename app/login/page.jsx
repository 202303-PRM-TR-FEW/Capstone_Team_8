"use client";
//import firebase.js correctly

import { useRouter } from "next/navigation";
// import { useDispatch } from 'react-redux';
import { login } from "../../firebase/firebase";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import Spinner from '../components/Spinner';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const router = useRouter();
  // const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    email: yup
      .string()
      .trim("No leading/trailing whitepaces allowed")
      .required("Email is required")
      .email("Invalid email address"),
    password: yup
      .string()
      .trim("No leading/trailing whitepaces allowed")
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    const user = await login(data.email, data.password);

    if (user) {
      router.push("/welcome");
    }
  };

  // const dispatch = useDispatch();

  return (
    <>
      <div className="  ">
        {" "}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex  items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
              <div className="mt-8 space-y-6" method="">
                <input type="hidden" name="remember" value="true" />
                <div className="space-y-4 rounded-md ">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      {...register("email")}
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Email address"
                    />
                    <p
                      className={`text-red-700 px-3 ${
                        errors.email ? "" : "invisible"
                      }`}
                    >
                      {errors.email?.message || "Placeholder"}
                    </p>
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      type="password"
                      {...register("password")}
                      className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Password"
                    />
                    <p
                      className={`text-red-700 px-3 ${
                        errors.password ? "" : "invisible"
                      }`}
                    >
                      {errors.password?.message || "Placeholder"}
                    </p>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent  bg-[#D8605B] py-2 px-4 text-sm font-medium text-white hover:bg-[#b84c48] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="flex justify-center">
          <button
            className="text-center"
            // onClick={() => router.push("/resetPassword")}
          >
            Forgot Password
          </button>
        </div>
        <div className="text-center py-4">
          Dont have an account?{" "}
          <button
            className="text-[#D8605B] font-bold pl-2"
            // onClick={() => {
            //   router.push("/register");
            // }}
          >
            Register
          </button>
        </div>
      </div>
    </>
  );
}
