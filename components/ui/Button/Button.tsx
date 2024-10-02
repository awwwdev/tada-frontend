"use client";

import { forwardRef } from "react";
import Icon from "../Icon";
import { getSizeStyles, ui } from "../ui-config";
import { classes } from "./classes";
import { AllProps } from "./types";

const Button = forwardRef<HTMLButtonElement, AllProps>(function Button(
  {
    preStyled = true,
    className,
    variant,
    children,
    isLoading,
    iconButton,
    disabled,
    rounded = false,
    before,
    suffix,
    type = 'button',
    size = "md",
    ...props
  },
  ref
) {
  const cls = [
    "relative isolate ",
    classes.base,
    !disabled ? classes[variant] : "",
    rounded ? "rd-full" : ui.rd[size],
    disabled ? classes.disabled.base : "",
  ].join(" ");

  return (
    <button
      ref={ref}
      className={`${preStyled && cls} ${className}`}
      aria-disabled={disabled}
      aria-busy={isLoading}
      type={type}
      onClick={(e) => {
        if (disabled || isLoading) {
          e.preventDefault();
        } else {
          props?.onClick?.(e);
        }
      }}
      style={{
        minWidth: iconButton ? "fit-content" : "max(6rem , wit-content)",
        ...getSizeStyles(size, iconButton),
        height: '5rem',
        // paddingInline: iconButton ? undefined : `calc(3 * ${getSizeStyles(size, iconButton).padding})`,
        ...props?.style,
      }}
      {...props}
    >
      <Wrapper isLoading={isLoading}>
        <Box prefix={before} suffic={suffix}>
          {children}
        </Box>
      </Wrapper>
      {/* consider using grid overlapping. putting relative on button will interfer with absolute positioning it. */}
      {isLoading && (
        <Icon
          name="bf-i-svg-spinners:ring-resize"
          subdued={false}
          className="z-10  absolute top-50% left-50% -translate-x-50% -translate-y-50%"
        />
      )}
    </button>
  );
});

export default Button;

function Wrapper({ isLoading, children }: { isLoading?: boolean; children: React.ReactNode }) {
  if (isLoading) return <span className="invisible">{children}</span>;
  return <>{children}</>;
}

function Box({
  prefix,
  children,
  suffic,
  className,
  style,
}: {
  prefix?: React.ReactNode;
  children?: React.ReactNode;
  suffic?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  if (!prefix && !suffic) return <>{children}</>;

  return (
    <span
      className={className}
      style={{
        ...style,
        display: "inline-grid",
        gridTemplateColumns: `${prefix ? "auto" : ""} 1fr ${suffic ? "auto" : ""}`,
        alignItems: "center",
      }}
    >
      {prefix}
      <span>{children}</span>
      {suffic}
    </span>
  );
}
// tabs
// toggle
// radio card
// checkbox card

// select item
// drop down menu item
// context menu Item

// data-state="on"
// data-state="off"
// data-disabled="true"
// data-highlighted="true"

// dropdown menu
// data-state='open'
// data-state='closed'
// data-state='checked'
// data-state='unchecked'

// tabs
// data-state='active'
// data-state='inactive'
