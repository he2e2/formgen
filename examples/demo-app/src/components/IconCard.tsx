import { Card } from './Card';

export const IconCard = ({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) => {
  return (
    <Card className={`flex flex-col items-center text-center bg-gray-50`}>
      <div className="bg-gradient-to-br from-blue-200 to-purple-200 rounded-2xl w-20 h-20 flex items-center justify-center mb-2">
        <figure>
          <img src={icon} alt={icon} className="rounded-xl" />
        </figure>
      </div>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
      </div>
    </Card>
  );
};
