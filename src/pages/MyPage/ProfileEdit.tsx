// src/pages/MyPage/ProfileEdit.tsx
import Title from "@/components/shared/Title";

const ProfileEdit = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 p-8 shadow-xl dark:border-gray-700">
        <Title titleText="프로필 수정" className="mb-8 text-center text-3xl font-bold" />
        <p className="text-center">프로필 수정 기능은 준비 중입니다.</p>
      </div>
    </div>
  );
};

export default ProfileEdit;
