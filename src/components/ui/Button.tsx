interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

const Button = ({ className, children, ...props }: BtnProps) => {
  const baseClass = "btn btn-soft";
  const combinedClass = `${baseClass} ${className}`.trim();

  return (
    <button className={combinedClass} {...props}>
      {children}
    </button>
  );
};

export default Button;
