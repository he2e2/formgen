export const Card = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`card py-12 px-6 rounded-lg transition-shadow hover:shadow-xl duration-300 ${className}`}
    >
      {children}
    </div>
  );
};
