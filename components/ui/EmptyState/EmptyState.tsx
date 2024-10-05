export default function EmptyState({
  icon,
  title,
  subtitle,
  children,
}: {
  icon?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="text-center">
        <p className="fs-xl">
          {icon}
          {title}
        </p>
        {subtitle && <p className="c-base11 italic">{subtitle}</p>}

        <div>{children}</div>
      </div>
    </div>
  );
}
