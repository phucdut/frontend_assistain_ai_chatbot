import { Section1, Section2, Section3 } from "@/components/landing";
import Header from "@/components/landing/header";

const pageHome = () => {
  return (
    <div>
      <Header></Header>
      <Section1></Section1>
      <Section2></Section2>
      <Section3></Section3>
    </div>
  );
};

export default pageHome;
