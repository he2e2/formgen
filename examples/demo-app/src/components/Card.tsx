export const Card = ({
  children,
  className = '',
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <>
      <div
        className={`card py-12 px-6 rounded-lg transition-shadow hover:shadow-xl duration-300 ${className}`}
        onClick={onClick}
      >
        {children}
      </div>
    </>
  );
};
