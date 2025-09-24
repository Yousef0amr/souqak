import { cn } from "@/config/shadcnUtils";
import { Input } from "./input";

interface InputWithIconsProps extends Omit<React.ComponentProps<"input">, "prefix" | "suffix"> {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

// make a input with icon prefix and suffix
const InputWithIcons = ({ prefix, suffix, className, ...props }: InputWithIconsProps) => {
  return (
    <div className="relative">
      {prefix && (
        <div className="absolute left-3 top-0 h-full flex items-center justify-center">
          {prefix}
        </div>
      )}
      <Input
        className={cn("px-9 py-2.5 bg-background border-0 shadow-none", className)}
        {...props}
      />
      {suffix && (
        <div className="absolute right-0 top-0 h-full flex items-center justify-center">
          {suffix}
        </div>
      )}
    </div>
  );
};

export default InputWithIcons;
