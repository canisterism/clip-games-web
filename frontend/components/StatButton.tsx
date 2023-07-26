type Props = {
  icon?: React.ReactNode;
  label: string;
  stat: string;
  onClick?: () => void;
};

export default function StatButton({ icon, label, stat, onClick }: Props) {
  return (
    <button
      className="isolate inline-flex rounded-md shadow-sm"
      onClick={onClick}
    >
      <div className="relative inline-flex items-center gap-x-1.5 rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
        {icon}
        {label}
      </div>
      <div className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
        {stat}
      </div>
    </button>
  );
}
