import { fetchCategory, type Category } from "@/api/common/category";
import { useEffect, useState } from "react";
import Fillter, { type FilterGroup } from "@/components/shared/Fillter";
import type { FilterSectionProps } from "@/types/communityListType";

const FilterSection = ({ communityType, onFilterChange, onSearchSubmit }: FilterSectionProps) => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetchCategory()
            .then(res => setCategories(res.data.list))
            .catch(err => console.error("카테고리 불러오기 실패:", err));
    }, []);

    // 공모전 필터
    const filterGroupByContest: FilterGroup[] = [
        {
            name: "category",
            label: "분야",
            options: categories.map(cat => ({
                label: cat.name,
                value: String(cat.category_id),
            })),
            multiSelect: true,
        },
        {
            name: "age",
            label: "연령",
            options: [
                { label: "대학생", value: "1" },
                { label: "직장인/일반인", value: "2" },
                { label: "제한없음", value: "3" },
            ],
        },
        {
            name: "sort",
            label: "정렬",
            options: [
                { label: "최신순", value: "1" },
                { label: "스크랩순", value: "2" },
                { label: "종료임박순", value: "3" },
            ],
        },
    ];

    // 스터디 필터
    const filterGroupByStudy: FilterGroup[] = [
        {
            name: "age",
            label: "연령",
            options: [
                { label: "대학생", value: "1" },
                { label: "직장인/일반인", value: "2" },
                { label: "제한없음", value: "3" },
            ],
        },
        {
            name: "sort",
            label: "정렬",
            options: [
                { label: "최신순", value: "1" },
                { label: "스크랩순", value: "2" },
                { label: "종료임박순", value: "3" },
            ],
        },
    ];

    // 자유 필터
    const filterGroupByFree: FilterGroup[] = [
        {
            name: "sort",
            label: "정렬",
            options: [
                { label: "최신순", value: "1" },
                { label: "스크랩순", value: "2" },
                { label: "종료임박순", value: "3" },
            ],
        },
    ];

    const getFilterGroup = () => {
        if (communityType === "1") return filterGroupByContest;
        if (communityType === "2") return filterGroupByStudy;
        return filterGroupByFree;
    };

    return (
        <Fillter
            filters={getFilterGroup()}
            onFilterChange={onFilterChange}
            onSearchSubmit={onSearchSubmit}
        />
    );
};

export default FilterSection;
