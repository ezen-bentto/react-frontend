import { footerWrapper, footerSection, footerLink, footerCopy } from "../style/footer";
/**
 * footer 컴포넌트
 * 웹 최하단에 위치하는 컴포넌트
 * 정적인 컴포넌트라 모바일, 사이즈변화에 따른 변동 없음
 *
 * @function Footer.tsx
 * @date 2025/05/31
 * @history
 * -------------------------------------------------------
 *           변경일             작성자             변경내용
 * -------------------------------------------------------
 *
 *        2025/05/31           이철욱               신규작성
 * @param 매개변수
 *
 */

const Footer = () => {
  return (
    <footer className={footerWrapper()}>
      <div className={footerSection({ spacing: "top" })}>
        <strong>청바지</strong>
      </div>

      <div className={footerSection({ spacing: "middle" })}>
        <p>서울 종로구 우정국 2길 37 이젠 아카데미 5층 501호</p>
        <p>청년 정보 사이트 청바지 000 - 0000 (평일 09시 ~ 18시)</p>
        <p>시스템 관련 문의 000@gmail.com</p>
      </div>

      <div className={footerSection({ spacing: "bottom" })}>
        <div className="text-center md:text-left">
          <a className={footerLink({ highlight: true })} href="#">
            이용약관
          </a>
          |
          <a className={footerLink({ highlight: true })} href="#">
            개인정보처리방침
          </a>
          |
          <a className={footerLink({ highlight: true })} href="#">
            오픈API소개
          </a>
        </div>
        <div className={footerCopy()}>
          Copyright Office for Youth Policy Coordination. All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
