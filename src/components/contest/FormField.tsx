interface FormFieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

export const FormField = ({ label, required = false, children }: FormFieldProps) => (
  <div className="flex flex-col items-start md:flex-row md:items-center">
    <label className="min-w-30 block text-sm font-medium mb-2">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {children}
  </div>
);
