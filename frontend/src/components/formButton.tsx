import { VscLoading } from "react-icons/vsc";

interface Props {
  textButton: string;
  isLoading: boolean;
  marginTopClass?: string;
}

const FormButton = ({ textButton, isLoading, marginTopClass }: Props) => {
  return (
    <button
      type="submit"
      className={`bg-primary rounded-full text-white font-bold group
        disabled:cursor-wait text-lg flex justify-center items-center
        px-4 py-3 gap-2 w-full 
        ${marginTopClass}`}
      disabled={isLoading}
    >
      <VscLoading className="bg-primary hidden fill-white text-2xl animate-spin group-disabled:inline" />
      {textButton}
    </button>
  );
};

export default FormButton;
