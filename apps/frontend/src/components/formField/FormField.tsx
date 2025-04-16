import { InputHTMLAttributes } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
  name: string;
  type?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors;
  autofocus?: boolean;
}

export const FormField = ({
  label,
  placeholder,
  name,
  type = "text",
  register,
  errors,
  ...rest
}: FormFieldProps) => {
  return (
    <div>
      <label className="text-[1rem] font-[bold] p-[0.6rem]">{label}</label>
      <input
        autoFocus={rest.autofocus}
        className="p-[0.6rem] border border-[#ccc] rounded-[6px] text-[1rem]"
        type={type}
        placeholder={placeholder}
        {...register(name, { required: "Required field" })}
        {...rest}
      />
      {errors[name] && (
        <p className="text-center mt-auto font-bold text-[1rem] text-[#ff0000]">
          {String(errors[name]?.message)}
        </p>
      )}
    </div>
  );
};
