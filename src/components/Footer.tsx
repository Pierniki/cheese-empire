import React from 'react';

type Props = {
  //
};

export const Footer: React.FC<Props> = () => {
  return (
    <footer className=" bg-stone-900 py-2">
      <div className="container mx-auto px-16 ">
        <span className="text-stone-600">@2022 Marcin Szczepaniak</span>
      </div>
    </footer>
  );
};
