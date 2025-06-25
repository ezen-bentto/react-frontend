type DetailContentProps = {
  html: string;
};

const DetailContent = ({ html }: DetailContentProps) => {
<<<<<<< HEAD
=======
  // console.info(html);
>>>>>>> main
  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
};

export default DetailContent;
