interface FormFieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

export const FormField = ({ label, required = false, children }:FormFieldProps) => (
  <div className="flex mb-6 mx-5 items-center">
    <label className="min-w-30 block text-sm font-medium text-gray-700 mb-2">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {children}
  </div>
);