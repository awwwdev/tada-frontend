
const classes = {
  labelText: "capitalize",
  requiredStar: "mis-1 c-red11",
};

type LabelProps = {
  noPreStyle?: boolean;
  children?: React.ReactNode;
  required?: boolean;
};

export default function Label({ children,  required,  noPreStyle = false }: LabelProps) {
  if (!children) return <></>;
  return (
    <legend >
      <span className={` ${!noPreStyle && classes.labelText} `}>{children}</span>
      {required && <span aria-hidden={true} className={classes.requiredStar}>*</span>}
    </legend>
  );
}
