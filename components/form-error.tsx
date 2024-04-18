import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    // <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
    <div className="bg-green-500/15 p-3 rounded-md-px flex items-center gap-x-2 text-sm text-green-500">
      <ExclamationTriangleIcon className="h-2 w-2" />
      <p>{message}</p>
    </div>
  );
};
