import { avatarContainer, avatarImageWrapper, avatarImage } from "../style/avatar";

/**
 *
 * Avatar 컴포넌트
 * 사용자 프로필 이미지를 나타내는 컴포넌트
 * 전달된 이미지 주소(src)를 기반으로 지정된 사이즈와 모양(shape)으로 렌더링된다.
 * 스타일 유틸 함수들을 통해 외부에서 사이즈 및 형태를 조정할 수 있다.
 *
 * @function Avatar.tsx
 * @date 2025/05/31
 * @history
 * -------------------------------------------------------
 *           변경일             작성자             변경내용
 * -------------------------------------------------------
 *
 *        2025/05/31           이철욱               신규작성
 *
 * @param src 표시할 아바타 이미지의 URL
 * @param alt 이미지의 대체 텍스트 (기본값: "avatar")
 * @param size 아바타 크기 옵션 ("sm" | "md" | "lg" | "xl")
 * @param shape 이미지 모양 ("square" | "circle")
 */

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
