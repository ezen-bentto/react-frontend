//src/pages/MyPage/ProfileEdit.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { updateProfile } from "@/api/mypage/profileApi";
import { uploadImage } from "@/api/common/upload";
import Title from "@/components/shared/Title";
import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import Badge from "@/components/shared/Badge";
import Avatar from "@/components/shared/Avatar";
import FileInput from "@/components/shared/FileInput";

const ProfileEdit = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth(); // login 함수를 가져와 유저 정보 업데이트에 사용

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [selectedFileName, setSelectedFileName] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("error");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    if (user) {
      setNickname(user.nickname || "");
      setEmail(user.email || "");
      setProfileImage(user.profileImage || null);
    }
  }, [user]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // FileInput 컴포넌트에서 파일이 선택되었을 때 호출될 함수
  const handleFileSelect = (file: File) => {
    setNewImageFile(file);
    setSelectedFileName(file.name);
    // 선택한 이미지로 미리보기를 즉시 업데이트
    setProfileImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    // user 객체가 null일 경우를 함수 시작 부분에서 먼저 확인
    if (!user) {
      setMessageType("error");
      setMessage("사용자 정보가 없습니다. 다시 로그인해 주세요.");
      return;
    }

    if (!nickname.trim()) {
      setMessageType("error");
      setMessage("닉네임을 입력해주세요.");
      return;
    }

    if (!emailRegex.test(email)) {
      setMessageType("error");
      setMessage("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    let newImageUrl = user.profileImage; // 기본값은 기존 이미지

    try {
      // 1. 새로운 이미지 파일이 있으면 먼저 업로드
      if (newImageFile) {
        // 공용 API가 반환하는 값은 URL이므로, newImageUrl에 저장
        newImageUrl = await uploadImage({
          file: newImageFile,
          fileName: newImageFile.name,
          id: Number(user.id),
          type: "profile",
        });
      }

      // 2. 닉네임, 이메일과 새 이미지 URL로 프로필 정보를 업데이트
      const updateResponse = await updateProfile({
        nickname: nickname,
        email: email,
        profileImage: newImageUrl,
      });

      if (updateResponse.success) {
        setMessageType("success");
        setMessage("프로필이 성공적으로 수정되었습니다.마이페이지로 돌아갑니다.");

        // 3. AuthContext의 유저 정보를 업데이트하여 앱 전체에 반영
        const { accessToken, refreshToken } = updateResponse.data;
        if (accessToken && refreshToken) {
          login(accessToken, refreshToken);
        }

        setTimeout(() => navigate("/mypage"), 1500);
      } else {
        throw new Error(updateResponse.message || "프로필 수정에 실패했습니다.");
      }
    } catch (error: unknown) {
      setMessageType("error");
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8 pt-28">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 p-8 shadow-xl dark:border-gray-700">
        <Title titleText="프로필 수정" className="mb-6 text-center text-3xl font-bold" />

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
          <Avatar src={profileImage || "/images/default-avatar.png"} size="xl" />
          <div className="items-center justify-center">
            <FileInput
              onFileSelect={handleFileSelect}
              selectedFileName={selectedFileName}
              className="w-full"
            />
          </div>

          <Input
            legendText="이메일"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="새 이메일을 입력하세요"
            required
            className="w-full"
          />

          <Input
            legendText="닉네임"
            type="text"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
            placeholder="새 닉네임을 입력하세요"
            required
            className="w-full"
          />

          <div className="flex h-6 items-center justify-center">
            {message && (
              <Badge intent={messageType === "error" ? "orange" : "default"} size="sm">
                {message}
              </Badge>
            )}
          </div>

          <Button type="submit" intent="orange" size="lg" className="w-full">
            저장하기
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
