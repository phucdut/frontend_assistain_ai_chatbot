import { Section1, Section2, Section3 } from "@/components/landing";
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";

const pageHome = () => {
  return (
    <div>
      {/* <iframe
        src="http://localhost:3000/embed/?chatbot_id=1d90c339-fb35-4c1a-9e9e-85451bb18fc8&modeltype=gpt-3.5-turbo&mode=false&logo=ZmFsc2U="
        allow="clipboard-write; *;microphone *"
        width="100%"
        height="950"
        frameBorder="0"
      ></iframe> */}
      <Header></Header>
      <Section1></Section1>
      <Section2></Section2>
      <Section3></Section3>
      <Footer></Footer>
    </div>
  );
};

export default pageHome;
