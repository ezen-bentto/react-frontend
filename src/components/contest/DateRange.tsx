interface DateRangeProps {
  startDate: string;
  endDate: string;
  // eslint-disable-next-line no-unused-vars
  onStartDateChange: (date: string) => void;
  // eslint-disable-next-line no-unused-vars
  onEndDateChange: (date: string) => void;
  className?: string;
}

export const DateRange = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  className = "",
}: DateRangeProps) => {
  return (
    <div className={`flex w-full gap-1 items-center ${className} md:gap-4`}>
      <input
        type="date"
        value={startDate}
        onChange={e => onStartDateChange(e.target.value)}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <span className="text-gray-500">~</span>
      <input
        type="date"
        value={endDate}
        onChange={e => onEndDateChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        min={startDate} // 종료일은 시작일 이후만 선택 가능
      />
    </div>
  );
};
