interface DateRangeProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  className?: string;
}

export const DateRange = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  className = ""
}: DateRangeProps) => {
  return (
    <div className={`flex gap-4 items-center ${className}`}>
      <input
        type="date"
        value={startDate}
        onChange={(e) => onStartDateChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <span className="text-gray-500">~</span>
      <input
        type="date"
        value={endDate}
        onChange={(e) => onEndDateChange(e.target.value)}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        min={startDate} // 종료일은 시작일 이후만 선택 가능
      />
    </div>
  );
};