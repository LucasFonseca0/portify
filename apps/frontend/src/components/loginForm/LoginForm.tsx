import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAuthActions } from "../../stores/useAuth.ts";
import Logo from "../../assets/Portify-logo.png";
import { FormField } from "../formField/FormField.tsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./SchemaValidation.tsx";

type LoginFormInputs = {
  username: string;
  password: string;
};

export const LoginForm: React.FC = () => {
  const { login } = useAuthActions();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormInputs>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    const result = await login(data.username, data.password);

    if (result.success) {
      reset();
      return toast.success("Login successfully!");
    }
    reset();
    return toast.error(result.message || "Error login");
  };

  return (
    <div className="flex w-screen h-screen bg-gray-100 ">
      <div className="bg-[#4682b4] w-1/2 h-screen flex items-center justify-center">
        <img
          className="w-3/5 h-auto object-cover"
          src={Logo}
          alt="Logo"
          loading="lazy"
        />
      </div>

      <div className="bg-[#fff] w-[400px] overflow-hidden my-20 mx-auto p-8 g-4 bg-white rounded-[12px] shadow-[0_5px_20px_rgba(0,0,0,0.1)] flex md:flex-row flex-col max-h-[400px] mt-[100px] justify-center  ">
        <h1 className="text-center text-[1.8rem] mb-[1.5rem]">Login</h1>
        <form
          className="flex flex-col items-center gap-[1.3rem] "
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormField
            label="User"
            placeholder="Enter your username"
            name="username"
            register={register}
            errors={errors}
            autofocus={true}
          />

          <FormField
            label="Password"
            placeholder="Enter your password"
            name="password"
            type="password"
            register={register}
            errors={errors}
          />

          <button
            className="bg-[#4682b4] text-[#fff] font-[bold] p-3 border-0 rounded-[6px] text-base w-[22vw] h-[30px] text-[1.1rem] hover:bg-[#4338ca] cursor-[pointer] transition-colors duration-200 ease-in-out disabled:bg-[#a5b4fc] disabled:cursor-not-allowed"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Entering..." : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
};
