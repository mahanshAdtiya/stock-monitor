import React from 'react';

interface HeaderProps {
  category: string;
  title: string;
}

const Header: React.FC<HeaderProps> = ({ category, title }) => (
  <div className="mb-10">
    <p className="text-lg text-sky-600">{category}</p>
    <p className="text-3xl font-extrabold tracking-tight text-sky-700">
      {title}
    </p>
  </div>
);

export default Header;
