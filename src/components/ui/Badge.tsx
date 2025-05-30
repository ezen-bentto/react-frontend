import { badge, type BadgeVariants } from "../style/badge";

const Badge = ({ intent, size, children }: BadgeVariants & { children: React.ReactNode }) => {
  return <button className={badge({ intent, size })}>{children}</button>;
};

export default Badge;
