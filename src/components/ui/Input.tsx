import { type InputHTMLAttributes, forwardRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, IProps>(({ ...rest }, ref) => {
  return (
    <input
      ref={ref}
      className="border-[1px] border-gray-300 mb-3 shadow-lg focus:border-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-lg px-3 py-3 text-md w-full bg-transparent "
      {...rest}
    />
  );
});

export default Input;
