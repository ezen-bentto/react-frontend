type DetailContentProps = {
  html: string;
};

const DetailContent = ({ html }: DetailContentProps) => {
  // console.info(html);
  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
};

export default DetailContent;
