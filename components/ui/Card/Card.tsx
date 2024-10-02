import { forwardRef, useMemo } from "react";
import { getSizeStyles, Size } from "../ui-config";

const variants = ["base"] as const;

export type CardProps = {
  variant?: (typeof variants)[number];
  size?: Size;
  preStyled?: boolean;
  className?: string;
  elevation?: "none" | "sm" | "md" | "lg";
  width?: string;
  style?: React.CSSProperties;
};
export type Ref = HTMLButtonElement;
export type AllProps = React.ComponentPropsWithoutRef<"div"> & CardProps;

const Card = forwardRef<HTMLDivElement, AllProps>(function Button(
  { preStyled = true, className, variant = "base", children, size = "md", elevation = "none", width, ...props },
  ref
) {
  const shadow = useMemo(() => {
    if (elevation === "none") return "";
    if (elevation === "sm") return "shadow-lg shadow-black/50";
    if (elevation === "md") return "shadow-xl shadow-black/50";
    if (elevation === "lg") return "shadow-2xl shadow-black/50";
  }, [elevation]);

  return (
    <div
      {...props}
      className={` ${shadow}   b-1 b-base6 bg-base2 ${className}`}
      ref={ref}
      style={
        {
          borderRadius: `calc(${getSizeStyles(size).borderRadius} + var(--card-padding))`,
          padding: "var(--card-padding)",
          "--card-padding": `calc( 1.5 * ${getSizeStyles(size).padding})`,
          width,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
});

export default Card;
