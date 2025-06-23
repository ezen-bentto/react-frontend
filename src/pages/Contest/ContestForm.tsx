import { CheckboxGroup } from "@/components/contest/Checkbox";
import { FormField } from "@/components/contest/FormField";
import { TextInput } from "@/components/contest/TextInput";
import Button from "@/components/shared/Button";

import { contestFilterData } from "@/constants/ContestFilterData";
import { DateRange } from "@/components/contest/DateRange";
import { fetchContestEdit, fetchContestWrite } from "@/api/contest/contestApi";
import { RadioGroup } from "@/components/contest/RadioGroup";
import { useContestStore } from "@/store/ContestFormStore";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import ReactQuillEditor from "@/components/shared/ReactQuillEditor";

const ContestForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const { contestFormData, updateContestFormData } = useContestStore();
  const navigate = useNavigate();

  // contestFilterData에서 옵션들 추출
  const getOptionsByName = (name: string) => {
    return contestFilterData.find(group => group.name === name)?.options || [];
  };

  const contestFieldOptions = getOptionsByName("field");
  const ageGroupOptions = getOptionsByName("ageGroup");
  const organizerTypeOptions = getOptionsByName("organizerType");
  const benefitOptions = getOptionsByName("benefits");
  const awardOptions = getOptionsByName("award");

  useEffect(() => {
    if (isEdit) {
      // store에 contestFormData 가져오기
    }
  }, [id]);

  const handleSubmit = async () => {
    console.info("등록 전 데이터 확인:", contestFormData);
    let response;
    try {
      if (isEdit) {
        response = await fetchContestEdit(contestFormData);
        console.info("수정", response.data);
        alert("성공적으로 수정되었습니다.");
      } else {
        response = await fetchContestWrite(contestFormData);
        console.info("등록", response.data);
        alert("성공적으로 등록되었습니다.");
      }
      navigate(`/contest/${response.data.id}`);
    } catch (error) {
      console.info("실패", error);
      alert("등록에 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col gap-5 mt-28">
      <div className="space-y-6">
        {/* 공모명 */}
        <FormField label="공모명" required>
          <TextInput
            value={contestFormData.title}
            onChange={e => updateContestFormData({ title: e.target.value })}
            placeholder="공모명을 입력해 주세요."
          />
        </FormField>

        {/* 공모기간 */}
        <FormField label="공모기간" required>
          <DateRange
            startDate={contestFormData.start_date}
            endDate={contestFormData.end_date}
            onStartDateChange={date => updateContestFormData({ start_date: date })}
            onEndDateChange={date => updateContestFormData({ end_date: date })}
          />
        </FormField>

        {/* 홈페이지 */}
        <FormField label="홈페이지" required>
          <TextInput
            value={contestFormData.homepage}
            onChange={e => updateContestFormData({ homepage: e.target.value })}
            placeholder="공모전관련 페이지를 입력해 주세요."
          />
        </FormField>

        {/* 주최사 */}
        <FormField label="주최사" required>
          <TextInput
            value={contestFormData.organizer}
            onChange={e => updateContestFormData({ organizer: e.target.value })}
            placeholder="주최사를 입력해 주세요."
          />
        </FormField>

        {/* 공모분야 */}
        <FormField label="공모분야" required>
          <CheckboxGroup
            options={contestFieldOptions}
            selectedValues={contestFormData.contest_tag}
            onChange={values => updateContestFormData({ contest_tag: values })}
          />
        </FormField>

        {/* 참여대상 */}
        <FormField label="참여대상" required>
          <RadioGroup
            options={ageGroupOptions}
            selectedValue={contestFormData.participants}
            onChange={value => updateContestFormData({ participants: value })}
          />
        </FormField>

        {/* 시상내역 */}
        <FormField label="시상내역" required>
          <RadioGroup
            options={awardOptions}
            selectedValue={contestFormData.prize}
            onChange={value => updateContestFormData({ prize: value })}
          />
        </FormField>

        {/* 기업형태 */}
        <FormField label="기업형태" required>
          <RadioGroup
            options={organizerTypeOptions}
            selectedValue={contestFormData.organizer_type}
            onChange={value => updateContestFormData({ organizer_type: value })}
          />
        </FormField>

        {/* 혜택 */}
        <FormField label="혜택">
          <RadioGroup
            options={benefitOptions}
            selectedValue={contestFormData.benefits}
            onChange={value => updateContestFormData({ benefits: value })}
          />
        </FormField>

        {/* 상세정보 */}
        <FormField label="상세정보" required>
          <div className="w-full ">
            {/* <ReactQuill
              value={contestFormData.article}
              onChange={value => updateContestFormData({ article: value })}
              theme="snow"
              className="h-[400px] mb-4"
              placeholder=""
            />
            */}
            <ReactQuillEditor
              value={contestFormData.article}
              onChange={value => updateContestFormData({ article: value })}
              className="h-[400px] mb-4"
            />
          </div>
        </FormField>

        {/* TODO: 파일 */}
      </div>

      {/* 버튼 */}
      <div className="flex justify-end gap-3 py-10">
        <Button intent="primary" size="lg" type="button" onClickFnc={() => {}}>
          취소
        </Button>
        <Button intent="primary" size="lg" type="submit" onClickFnc={handleSubmit}>
          {contestFormData.id ? "수정" : "등록"}
        </Button>
      </div>
    </div>
  );
};

export default ContestForm;
