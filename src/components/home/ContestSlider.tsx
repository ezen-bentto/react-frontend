import React from "react";
import { Link } from "react-router-dom";
import Card from "../shared/Card";
import { Carousel } from "antd";

const ContestSlider = () => {
  return (
    <div className="w-full max-w-screen-xl mx-auto overflow-hidden">
      <h2 className="sr-only">
        <Link to={"/contest"}>이런 공모전 어때요</Link>
      </h2>
      <Carousel slidesToShow={3} className="gap-4">
        <Card
          dday="20"
          id={12}
          img="https://api.linkareer.com/attachments/583730"
          text="dwr"
          title="타이틀입니다."
          intent={"neutral"}
          size={"lg"}
        />
        <Card
          dday="20"
          id={12}
          img="https://api.linkareer.com/attachments/583730"
          text="dwr"
          title="타이틀입니다."
          intent={"neutral"}
          size={"lg"}
        />
        <Card
          dday="20"
          id={12}
          img="https://api.linkareer.com/attachments/583730"
          text="dwr"
          title="타이틀입니다."
          intent={"neutral"}
          size={"lg"}
        />
        <Card
          dday="20"
          id={12}
          img="https://api.linkareer.com/attachments/583730"
          text="dwr"
          title="타이틀입니다."
          intent={"neutral"}
          size={"lg"}
        />
        <Card
          dday="20"
          id={12}
          img="https://api.linkareer.com/attachments/583730"
          text="dwr"
          title="타이틀입니다."
          intent={"neutral"}
          size={"lg"}
        />
        <Card
          dday="20"
          id={12}
          img="https://api.linkareer.com/attachments/583730"
          text="dwr"
          title="타이틀입니다."
          intent={"neutral"}
          size={"lg"}
        />
      </Carousel>
    </div>
  );
};

export default ContestSlider;
