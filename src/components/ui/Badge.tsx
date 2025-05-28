interface BadgeProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children: React.ReactNode;
}

const Badge = ({ className, children, ...props }: BadgeProps) => {
  const baseClass = "badge badge-warning p-4";
  const combinedClass = `${baseClass} ${className}`.trim();

  return (
    <>
      <button className={combinedClass} {...props}>
        {children}
      </button>
    </>
  );
};

export default Badge;
