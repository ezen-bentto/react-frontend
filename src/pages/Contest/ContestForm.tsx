import { CheckboxGroup } from "@/components/contest/Checkbox";
import { FormField } from "@/components/contest/FormField";
import { TextInput } from "@/components/contest/TextInput";
import Button from "@/components/shared/Button";
import { useState } from "react";
import ReactQuill from "react-quill-new";
import { contestFilterData } from "@/constants/ContestFilterData";
import { DateRange } from "@/components/contest/DateRange";
import axios from "axios";

const ContestForm = () => {
  // const { id } = useParams();
  // const isEdit = Boolean(id);
  const [formData, setFormData] = useState({
    contestName: "",
    contestPeriod: {
      start: "",
      end : ""
    },
    homepage: "",
    organizer: "",
    contestFields: [] as string[],
    contestMaterials: [] as string[],
    awardCategory: "선택",
    benefits: [] as string[],
    content: ""
  });

   // contestFilterData에서 옵션들 추출
  const contestFieldOptions = contestFilterData.find(group => group.name === "field")?.options || [];
  const ageGroupOptions = contestFilterData.find(group => group.name === "ageGroup")?.options || [];
  const organizerTypeOptions = contestFilterData.find(group => group.name === "organizerType")?.options || [];
  const benefitOptions = contestFilterData.find(group => group.name === "benefits")?.options || [];
  const awardOptions = contestFilterData.find(group => group.name === "award")?.options || [];

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:4000/api/contest/register", formData);
      console.info("등록", response.data)
      alert("성공적으로 등록되었습니다.");
    } catch (error) {
      console.info("실패", error)
      alert("등록에 실패했습니다.");
    }
  }

  return (
     <div className="flex flex-col gap-5 mt-28">
      <div className="space-y-6">
        {/* 공모명 */}
        <FormField label="공모명" required>
          <TextInput
            value={formData.contestName}
            onChange={(e) => setFormData({...formData, contestName: e.target.value})}
            placeholder="공모명을 입력해 주세요."
          />
          {/* <Input legendText="" key={} status="normal" /> */}
        </FormField>

        {/* 공모기간 */}
        <FormField label="공모기간" required>
          <DateRange
            startDate={formData.contestPeriod.start}
            endDate={formData.contestPeriod.end}
            onStartDateChange={(date) => setFormData({
              ...formData, 
              contestPeriod: {...formData.contestPeriod, start: date}
            })}
            onEndDateChange={(date) => setFormData({
              ...formData, 
              contestPeriod: {...formData.contestPeriod, end: date}
            })}
          />
        </FormField>

        {/* 홈페이지 */}
        <FormField label="홈페이지" required>
          <TextInput
            value={formData.homepage}
            onChange={(e) => setFormData({...formData, homepage: e.target.value})}
            placeholder="공모전관련 페이지를 입력해 주세요."
          />
        </FormField>

        {/* 주최사 */}
        <FormField label="주최사" required>
          <TextInput
            value={formData.organizer}
            onChange={(e) => setFormData({...formData, organizer: e.target.value})}
            placeholder="주최사를 입력해 주세요."
          />
        </FormField>

        {/* 공모분야 */}
        <FormField label="공모분야" required>
          <CheckboxGroup
            options={contestFieldOptions}
            selectedValues={formData.contestFields}
            onChange={(values) => setFormData({...formData, contestFields: values})}
          />
        </FormField>

        {/* 참여대상 */}
        <FormField label="참여대상" required>
          <CheckboxGroup
            options={ageGroupOptions}
            selectedValues={formData.benefits}
            onChange={(values) => setFormData({...formData, benefits: values})}
          />
        </FormField>

        {/* 시상내역 */}
        <FormField label="시상내역" required>
          <CheckboxGroup
            options={awardOptions}
            selectedValues={formData.benefits}
            onChange={(values) => setFormData({...formData, benefits: values})}
          />
        </FormField>

        {/* 기업형태 */}
        <FormField label="기업형태" required>
          <CheckboxGroup
            options={organizerTypeOptions}
            selectedValues={formData.contestFields}
            onChange={(values) => setFormData({...formData, contestFields: values})}
          />
        </FormField>

        {/* 혜택 */}
        <FormField label="혜택">
          <CheckboxGroup
            options={benefitOptions}
            selectedValues={formData.benefits}
            onChange={(values) => setFormData({...formData, benefits: values})}
          />
        </FormField>

        {/* 상세정보 */}
        <FormField label="상세정보" required>
          <div className="w-full">
          <ReactQuill
            value={formData.content}
              onChange={value => setFormData(prev => ({ ...prev, content: value }))}
              theme="snow"
              className="h-[500px]"
              placeholder="내용을 입력해주세요"
            />
            </div>
        </FormField>

        {/* TODO: 파일 */}

        {/* 버튼 */}
        <div className="flex justify-end gap-2 py-8 mx-5">
          <Button
            intent="primary" 
            size="lg"
            type="button"
            onClickFnc={()=>{}}>
            취소
          </Button>
          <Button
            intent="primary"
            size="lg"
            type="submit"
            onClickFnc={handleSubmit}>
            {/* {isEditMode ? "수정" : "등록"} */}
            등록
          </Button>
        </div>

      </div>
    </div>
  )
}

export default ContestForm
