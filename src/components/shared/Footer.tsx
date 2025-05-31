import { footerWrapper, footerSection, footerLink, footerCopy } from "../style/footer";

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
          <a className={footerLink()} href="#">
            이용약관
          </a>
          |
          <a className={footerLink({ highlight: true })} href="#">
            개인정보처리방침
          </a>
          |
          <a className={footerLink()} href="#">
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
