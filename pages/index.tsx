import { Categories } from "@/components";
import Carousel from "@/components/carousel";
import MainLayout from "@/layout";
import { ReactElement } from "react";

export default function Home() {
  return (
    <>
      <Carousel />
      <Categories />
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout children={page} />;
};
