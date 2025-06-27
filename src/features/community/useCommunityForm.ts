import { useState } from "react";

export type CommunityOption = "1" | "2" | "3";

export interface Recruitment {
  role: string;
  count: string;
}

export interface CommunityForm {
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  recruitEndDate: string;
  ageGroup: string;
  recruitments: Recruitment[];
}

export const useCommunityForm = () => {
  const [selectedOption, setSelectedOption] = useState<CommunityOption>("1");
  const [formData, setFormData] = useState<CommunityForm>({
    title: "",
    content: "",
    startDate: "",
    endDate: "",
    recruitEndDate: "",
    ageGroup: "",
    recruitments: [{ role: "", count: "" }],
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRecruitmentChange = (index: number, field: "role" | "count", value: string) => {
    const updated = [...formData.recruitments];
    updated[index][field] = value;
    setFormData(prev => ({ ...prev, recruitments: updated }));
  };

  const handleAddRole = () => {
    setFormData(prev => ({
      ...prev,
      recruitments: [...prev.recruitments, { role: "", count: "" }],
    }));
  };

  const handleRemoveRole = (index: number) => {
    if (formData.recruitments.length > 1) {
      const updated = formData.recruitments.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, recruitments: updated }));
    }
  };

  return {
    selectedOption,
    setSelectedOption,
    formData,
    setFormData,
    handleFormChange,
    handleRecruitmentChange,
    handleAddRole,
    handleRemoveRole,
  };
};
