import { badge, type BadgeVariants } from "../style/badge";

/**
 *
 * Badge 컴포넌트
 * 태그나 상태를 표시할 때 사용하는 UI 컴포넌트
 * 스타일 유틸 함수인 `badge`를 통해 크기(size)와 색상 의도(intent)를 지정할 수 있다.
 * 기본적으로 button 요소로 렌더링되며, 내부 콘텐츠(children)는 자유롭게 전달 가능하다.
 *
 * @function Badge.tsx
 * @date 2025/05/31
 * @history
 * -------------------------------------------------------
 *           변경일             작성자             변경내용
 * -------------------------------------------------------
 *
 *        2025/05/31           이철욱               신규작성
 *
 * @param intent 뱃지의 색상 의도 (예: primary, defalut, orange 등)
 * @param size 뱃지의 크기 옵션 (예: sm, lg 등)
 * @param children 뱃지 내부에 표시할 텍스트 또는 요소
 */

const Badge = ({ intent, size, children }: BadgeVariants & { children: React.ReactNode }) => {
  return <button className={badge({ intent, size })}>{children}</button>;
};

export default Badge;
