
import Image from "next/image";
import Link from "next/link";

const Section2 = () => {
  return (
    <div className="contain-layout-responsive">
      <div className="text-center font-medium pt-[160px] leading-[36px] text-[24px] ">
        Trusted by forward-thinling pioneers
      </div>
      <div className="flex items-center justify-between pl-[150px] pr-[151.34px]">
        <Link href="/" className="pt-[40px] flex-shrink-0">
          <Image
            src="/z4755566056940_97f95a2da4aa31658321547b547bc18d-transformed 1.png"
            alt="AVOCA AI"
            width={168.067}
            height={54}
          ></Image>
        </Link>
        <Link href="/" className="pt-[45px] flex-shrink-0">
          <Image
            src="/image 19.png"
            alt="DAT.BIKE"
            width={154}
            height={44.139}
          ></Image>
        </Link>
        <Link href="/" className="pt-[42px] flex-shrink-0">
          <Image
            src="/image 18.png"
            alt="SWIN BUR"
            width={100}
            height={50}
          ></Image>
        </Link>
        <Link href="/" className="pt-[47px] flex-shrink-0">
          <Image
            src="/image 127.png"
            alt="TEKUP"
            width={154}
            height={39.742}
          ></Image>
        </Link>
        <Link href="/" className="pt-[42px] flex-shrink-0">
          <Image
            src="/image 20.png"
            alt="SELLY"
            width={115.116}
            height={50}
          ></Image>
        </Link>
        <Link href="/" className="pt-[42px] flex-shrink-0">
          <Image
            src="/image 128.png"
            alt="SONCHAN"
            width={122.656}
            height={50}
          ></Image>
        </Link>
      </div>
    </div>
  );
};

export default Section2;
