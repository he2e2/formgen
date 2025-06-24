export const Button = ({
  children,
  className = '',
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      className={`btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
