type PageHeaderProps = {
  title: string;
  description?: string;
};

export const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <div className="page__header">
      <h1 className="page__title">{title}</h1>

      {description && (
        <p className="page__description">
          {description}
        </p>
      )}
    </div>
  );
};