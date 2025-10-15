const PageHeaderWrapper = ({
  leftContent,
  rightContent,
}: {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
}) => {
  return (
    <div className="flex items-center justify-between ">
      <div>{leftContent}</div>
      <div>{rightContent}</div>
    </div>
  );
};

export default PageHeaderWrapper;
