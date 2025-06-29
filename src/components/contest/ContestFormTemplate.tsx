import { CheckboxGroup } from "@/components/contest/Checkbox";
import { FormField } from "@/components/contest/FormField";
import { TextInput } from "@/components/contest/TextInput";
import Button from "@/components/shared/Button";
import { DateRange } from "@/components/contest/DateRange";
import { RadioGroup } from "@/components/contest/RadioGroup";
// import ReactQuillEditor from "@/components/shared/ReactQuillEditor";
import { contestFilterData } from "@/constants/ContestFilterData";
import type { ContestFormData } from "@/types/contestType";
import { SkeletonInput, SkeletonTextarea } from "./SkeletonUI";
import ReactQuill from "react-quill-new";
import FileInput from "../shared/FileInput";

type Props = {
  formData: ContestFormData;
  // eslint-disable-next-line no-unused-vars
  onChange: (updated: Partial<ContestFormData>) => void;
  onSubmit: () => void;
  submitLabel: string;
  isLoading?: boolean; // ✅ 추가
};

const getOptionsByName = (name: string) =>
  contestFilterData.find(group => group.name === name)?.options || [];

const ContestFormTemplate = ({ formData, onChange, onSubmit, submitLabel, isLoading }: Props) => {
  // console.info(formData.file_path, formData.save_name);
  return (
    <div className="flex flex-col gap-5 mt-28">
      <div className="space-y-6">
        <FormField label="공모명" required>
          {isLoading ? (
            <SkeletonInput />
          ) : (
            <TextInput
              value={formData.title}
              onChange={e => onChange({ title: e.target.value })}
              placeholder="공모명을 입력해 주세요."
            />
          )}
        </FormField>

        <div className="flex-default w-full flex-col md:flex-row md:gap-16 gap-4">
          <FormField label="공모기간" required>
            {isLoading ? (
              <SkeletonInput />
            ) : (
              <DateRange
                startDate={formData.start_date}
                endDate={formData.end_date}
                onStartDateChange={date => onChange({ start_date: date })}
                onEndDateChange={date => onChange({ end_date: date })}
              />
            )}
          </FormField>

          {isLoading ? (
            <SkeletonInput />
          ) : (
            <FileInput
              onFileSelect={(file, save_name) => onChange({ file_path: file, save_name })}
              className="w-full"
              selectedFileName={formData.file_path?.name}
            />
          )}
        </div>

        <FormField label="홈페이지" required>
          {isLoading ? (
            <SkeletonInput />
          ) : (
            <TextInput
              value={formData.homepage}
              onChange={e => onChange({ homepage: e.target.value })}
              placeholder="공모전관련 페이지를 입력해 주세요."
            />
          )}
        </FormField>

        <FormField label="주최사" required>
          {isLoading ? (
            <SkeletonInput />
          ) : (
            <TextInput
              value={formData.organizer}
              onChange={e => onChange({ organizer: e.target.value })}
              placeholder="주최사를 입력해 주세요."
            />
          )}
        </FormField>

        <FormField label="공모분야" required>
          {isLoading ? (
            <SkeletonInput />
          ) : (
            <CheckboxGroup
              options={getOptionsByName("field")}
              selectedValues={formData.contest_tag}
              onChange={values => onChange({ contest_tag: values })}
            />
          )}
        </FormField>

        <FormField label="참여대상" required>
          {isLoading ? (
            <SkeletonInput />
          ) : (
            <RadioGroup
              options={getOptionsByName("ageGroup")}
              selectedValue={formData.participants}
              onChange={value => onChange({ participants: value })}
            />
          )}
        </FormField>

        <FormField label="시상내역" required>
          {isLoading ? (
            <SkeletonInput />
          ) : (
            <RadioGroup
              options={getOptionsByName("award")}
              selectedValue={formData.prize}
              onChange={value => onChange({ prize: value })}
            />
          )}
        </FormField>

        <FormField label="기업형태" required>
          {isLoading ? (
            <SkeletonInput />
          ) : (
            <RadioGroup
              options={getOptionsByName("organizerType")}
              selectedValue={formData.organizer_type}
              onChange={value => onChange({ organizer_type: value })}
            />
          )}
        </FormField>

        <FormField label="혜택">
          {isLoading ? (
            <SkeletonInput />
          ) : (
            <RadioGroup
              options={getOptionsByName("benefits")}
              selectedValue={formData.benefits}
              onChange={value => onChange({ benefits: value })}
            />
          )}
        </FormField>

        <FormField label="상세정보" required>
          {isLoading ? (
            <SkeletonTextarea />
          ) : (
            <ReactQuill
              value={formData.article}
              onChange={value => onChange({ article: value })}
              theme="snow"
              placeholder="내용을 입력하세요..."
              className="w-full h-[300px]"
            />
          )}
        </FormField>
      </div>

      <div className="flex justify-end gap-3 py-10">
        <Button intent="primary" size="lg" type="button" onClickFnc={() => {}}>
          취소
        </Button>
        <Button intent="primary" size="lg" type="submit" onClickFnc={onSubmit}>
          {submitLabel}
        </Button>
      </div>
    </div>
  );
};

export default ContestFormTemplate;
