import { CheckboxGroup } from "@/components/contest/Checkbox";
import { FormField } from "@/components/contest/FormField";
import { TextInput } from "@/components/contest/TextInput";
import Button from "@/components/shared/Button";
import { DateRange } from "@/components/contest/DateRange";
import { RadioGroup } from "@/components/contest/RadioGroup";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactQuillEditor from "@/components/shared/ReactQuillEditor";
import { useDetail } from "@/features/contest/useDetail";
import type { ContestFormData } from "@/types/contestType";
import { initialContestFormData } from "./ContestForm";
import { contestFilterData } from "@/constants/ContestFilterData";
import { useEditContestMutation } from "@/features/contest/useEdit";

const ContestUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // /contest/:id 라면 여기에 id 들어옴
  const { data } = useDetail(Number(id));
  const contestId = Number(id);

  const [contestFormData, setContestFormData] = useState<ContestFormData>(initialContestFormData);

  const updateContestFormData = (updatedFields: Partial<ContestFormData>) => {
    setContestFormData(prev => ({ ...prev, ...updatedFields }));
  };

  // ✅ useQuery로 받아온 데이터를 ContestFormData 형식으로 변환
  useEffect(() => {
    if (!data) return;

    const transformedData: ContestFormData = {
      ...data,
      contest_tag: data.contest_tag ? data.contest_tag.split(",") : [],
    };

    setContestFormData(transformedData);
  }, [data]);

  const { mutate: editContest } = useEditContestMutation(contestId);

  const handleSubmit = () => {
    editContest(contestFormData, {
      onSuccess: () => {
        alert("성공적으로 수정되었습니다.");
        navigate(`/contest/${contestId}`, { replace: true });
      },
      onError: () => {
        alert("수정에 실패했습니다.");
      },
    });
  };
  const getOptionsByName = (name: string) => {
    return contestFilterData.find(group => group.name === name)?.options || [];
  };

  const contestFieldOptions = getOptionsByName("field");
  const ageGroupOptions = getOptionsByName("ageGroup");
  const organizerTypeOptions = getOptionsByName("organizerType");
  const benefitOptions = getOptionsByName("benefits");
  const awardOptions = getOptionsByName("award");

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
            <ReactQuillEditor
              value={contestFormData.article}
              onChange={value => updateContestFormData({ article: value })}
              className="h-[400px] mb-4"
            />
          </div>
        </FormField>

        {/* TODO: 파일 */}
      </div>

      <div className="flex justify-end gap-3 py-10">
        <Button intent="primary" size="lg" type="button" onClickFnc={() => {}}>
          취소
        </Button>
        <Button intent="primary" size="lg" type="submit" onClickFnc={handleSubmit}>
          수정
        </Button>
      </div>
    </div>
  );
};

export default ContestUpdate;
