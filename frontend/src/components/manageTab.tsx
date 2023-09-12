import { GrDown } from "react-icons/gr";

type formType = "name" | "password" | undefined;

interface Props {
  label: string;
  showForm: (form: formType) => void;
  form: formType;
}

const ManageTab = ({ label, showForm, form }: Props) => {
  return (
    <div
      onClick={() => showForm(form)}
      className="border-2 border-gray-200 shadow-sm w-full rounded-lg
          flex justify-between items-center hover:cursor-pointer
          px-2.5
          py-3
          text-base"
    >
      <span className="select-none">{label}</span>
      <GrDown className="text-sm" />
    </div>
  );
};

export default ManageTab;
