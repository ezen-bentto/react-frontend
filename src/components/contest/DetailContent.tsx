type DetailContentProps = {
  html: string;
};

const DetailContent = ({ html }: DetailContentProps) => {
  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
};

export default DetailContent;
