import heroImg from "../../assets/hero.svg";
import { Button } from "../ui/button";
import Container from "./container";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <>
      <Container className="flex flex-wrap ">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
              Best marketplace
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
              That marketplace created on stack: Appwrite + React + Radix +
              Tailwind + Redux from scratch
            </p>

            <div className="flex flex-col gap-5 items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <Link href={""}>
                <Button>View products</Button>
              </Link>
              <Link href={""} target="_blank">
                <Button variant="outline" size="lg">
                  Bento
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="">
            <Image
              src={heroImg}
              width="616"
              height="617"
              className={"object-cover"}
              alt="Hero Illustration"
              loading="eager"
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default Hero;
