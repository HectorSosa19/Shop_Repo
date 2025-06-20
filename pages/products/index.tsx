import MainLayout from "@/layout";
import axios from "axios";
import React, { ReactElement, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import ContentModal, {
  ContentProps,
} from "@/components/full-modal/content-modal";
import FullModal from "@/components/full-modal";
import { CardComponent } from "@/components";
export default function Products() {
  const [data, setData] = useState<ContentProps[]>([]);
  const [selectedItem, setSelectedItem] = useState<ContentProps | null>(null);
  useEffect(() => {
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
    axios
      .get(`${BASE_URL}products`)
      .then((resp) => setData(resp.data))
      .catch((e) => console.log(e));
  }, []);
  return (
    <>
      <>
        <Box display="flex" bgColor="white.100" gap={"12"} flexWrap={"wrap"}>
          <Box
            flexDir="row"
            bgColor="white"
            flexWrap="wrap"
            paddingBottom="20px"
            margin="auto"
          >
            {data.map((item) => (
              <Box
                key={item.title}
                px="20px"
                paddingTop="40px"
                onClick={() => setSelectedItem(item)}
                display="flex"
              >
                <CardComponent
                  title={item.title}
                  price={item.price}
                  image={item.image}
                />
              </Box>
            ))}
          </Box>
        </Box>

        {selectedItem && (
          <FullModal
            isOpen={!!selectedItem}
            onClose={() => setSelectedItem(null)}
          >
            <ContentModal
              image={selectedItem.image}
              title={selectedItem.title}
              price={selectedItem.price}
              description={selectedItem.description}
              rating={selectedItem.rating}
            />
          </FullModal>
        )}
      </>
    </>
  );
}

Products.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout children={page} />;
};
