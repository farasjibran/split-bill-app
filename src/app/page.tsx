import CardHomeComponents from "@/components/CardHome";
import { Flex } from "antd";
import Link from "antd/es/typography/Link";
import Text from "antd/es/typography/Text";
import Title from "antd/es/typography/Title";

export default function Home() {
  return (
    <Flex
      vertical={true}
      justify="center"
      align="center"
      style={{ marginTop: 20, marginBottom: 20 }}
    >
      <Title>Split Bill App</Title>
      <CardHomeComponents />
      <Text style={{ marginTop: 14 }}>
        Inspired from{" "}
        <Link href="https://www.linkedin.com/in/dwi-kurnia-surya">
          dwikurniasurya
        </Link>
        . All rights reserved.{" "}
      </Text>
    </Flex>
  );
}
