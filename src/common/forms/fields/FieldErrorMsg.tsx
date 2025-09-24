export type ErrorProps = {
  errorMessages?: string[] | [];
  validated?: boolean;
};

export const FieldErrorMsg = ({ errorMessages, validated }: ErrorProps) => {
  if (!errorMessages?.length && !validated) {
    return null;
  }

  return errorMessages?.map((error: string) => {
    return (
      <div
        role="alert"
        key={crypto.randomUUID()}
        aria-label={error}
        className="text-red-500 text-[12px] mx-1 mt-1"
      >
        {error}
      </div>
    );
  });
};
