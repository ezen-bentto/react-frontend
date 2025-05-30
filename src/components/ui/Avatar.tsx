import { avatarContainer, avatarImageWrapper, avatarImage } from "../style/avatar";

interface AvatarProps {
  src: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
  shape?: "square" | "circle";
}

const Avatar = ({ src, alt = "avatar", size, shape }: AvatarProps) => {
  return (
    <div className={avatarContainer()}>
      <div className={avatarImageWrapper({ size, shape })}>
        <img src={src} alt={alt} className={avatarImage()} />
      </div>
    </div>
  );
};

export default Avatar;
