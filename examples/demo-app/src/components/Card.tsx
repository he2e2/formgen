import { useState } from 'react';
import { Modal } from './Modal';

export const Card = ({
  children,
  className = '',
  detailedContent,
}: {
  children: React.ReactNode;
  className?: string;
  detailedContent?: React.ReactNode;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className={`card py-12 px-6 rounded-lg transition-shadow hover:shadow-xl duration-300 ${className}`}
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        {children}
      </div>
      {detailedContent && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {detailedContent}
        </Modal>
      )}
    </>
  );
};
