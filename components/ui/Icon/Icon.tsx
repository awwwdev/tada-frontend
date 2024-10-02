export default function Icon({
  name,
  className,
  subdued = false,
  alt,
}: {
  name: String;
  className?: string;
  subdued?: boolean;
  alt?: string;
}) {
  return (
    <>
      {" "}
      <span
        className={`${name} select-none shrink-0 grow-0 vertical-align-[-0.125em] before:scale-120  ${className}  ${
          !subdued && "before:opacity-100 opacity-100"
        }`}
      />
      {alt && <span className="sr-only">{alt}</span>}{" "}
    </>
  );
}
