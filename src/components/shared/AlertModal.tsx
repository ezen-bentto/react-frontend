// src/components/shared/AlertModal.tsx
import React from "react";
import { modal, type ModalVariants } from "@/components/style/alertModal";

/**
 *
 * AlertModal 컴포넌트
 * 클릭 시 모달을 띄울 수 있는 UI 컴포넌트
 * `modal` 유틸 함수를 통해 스타일을 적용하고, 사용자 정의 텍스트(children)를 출력한다.
 * 다이얼로그 엘리먼트를 직접 제어하여 모달의 열림 상태를 제어한다.
 * 기본적으로 버튼을 클릭하면 `id="my_modal_1"`인 다이얼로그가 showModal()로 열리며,
 * 닫기 버튼은 <form method="dialog">를 통해 모달을 닫는다.
 *
 * @function AlertModal.tsx
 * @date 2025/05/31
 * @history
 * -------------------------------------------------------
 *           변경일             작성자             변경내용
 * -------------------------------------------------------
 *
 *        2025/05/31           이철욱               신규작성
 *
 * @param className 외부에서 전달할 수 있는 className, Tailwind 등의 유틸 클래스를 추가로 적용할 수 있음
 * @param size modal의 사이즈 옵션, 스타일 함수 `modal`에 전달
 * @param intent modal의 시각적 의도(예: success, warning 등), 스타일 함수 `modal`에 전달
 * @param children 모달 내부에 들어갈 콘텐츠 영역, 텍스트 또는 컴포넌트
 * @param props dialog 태그에 전달되는 HTML 기본 속성들 (예: open, id 등)
 */

interface AlertModalProps extends React.DialogHTMLAttributes<HTMLDialogElement>, ModalVariants {
  className?: string;
  children: React.ReactNode;
}

const AlertModal = ({ className, size, intent, children, ...props }: AlertModalProps) => {
  const combinedClass = `${modal({ size, intent })} ${className ?? ""}`.trim();

  return (
    <>
      <button
        className="btn text-brand-primary"
        onClick={() => {
          const modal = document.getElementById("my_modal_1");
          if (modal instanceof HTMLDialogElement) {
            modal.showModal();
          }
        }}
      >
        눌러봥
      </button>
      <dialog id="my_modal_1" className={combinedClass} {...props}>
        <div className="modal-box text-2xl">
          <h3 className="text-4xl font-bold">Hello!</h3>
          <p className="py-4">{children}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AlertModal;
