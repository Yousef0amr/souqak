import { Button } from "@/common/buttons/button";
import { cn } from "@/config/shadcnUtils";

const ButtonWithIconLabel = ({
  icon,
  label,
  onClick,
  btnclassName,
  className,
}: {
  icon: React.ReactNode;
  label?: string;
  onClick?: () => void;
  btnclassName?: string;
  className?: string;
}) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "rounded-full border bg-background hover:bg-accent dark:bg-background dark:hover:bg-background h-8 w-8",
        btnclassName
      )}
      size="icon"
      onClick={onClick}
    >
      <div className={cn("flex items-center justify-center", className)}>
        {icon}
        {label && <span className="text-sm leading-5 text-nowrap px-1">{label}</span>}
      </div>
    </Button>
  );
};

export default ButtonWithIconLabel;
