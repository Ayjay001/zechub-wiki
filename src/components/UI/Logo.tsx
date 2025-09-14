import Image from "next/image";

type LogoProps = {
  theme?: boolean;
};
const Logo = (props: LogoProps) => (
  <Image
    priority
    src={props.theme ? "/zechubLogo-white.png" : "/ZecHubBlue.png"}
    alt={"Logo"}
    width={60}
    height={60}
    className="rounded-full md:h-50"
  />
);

export default Logo;
