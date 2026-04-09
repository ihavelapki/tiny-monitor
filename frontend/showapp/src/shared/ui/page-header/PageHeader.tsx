import type { ReactNode } from 'react';

type PageHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
};

export const PageHeader = ({ title, description, actions }: PageHeaderProps) => {
  return (
    <div className="page__header">
      <div className="page__header_main">
        <h1 className="page__title">{title}</h1>
        {description && (<p className="page__description">{description}</p>)}
      </div>
      {actions && (<div className="page__actions">{actions}</div>)}
    </div>
  );
};