import { Col, Descriptions, Typography } from "antd";
import { Cookie } from "../common/types";
import { useMemo } from "react";

interface HARCookieEntryProps {
  cookie: Cookie;
}

const { Text } = Typography;

function getCookieDescriptions(cookie: Cookie) {
  const items = [
    {
      key: "value",
      label: "Value",
      children: <Text code>{cookie.value}</Text>,
      span: 3,
    },
  ];

  if (cookie.path) {
    items.push({
      key: "path",
      label: "Path",
      children: <Text>{cookie.path}</Text>,
      span: 3,
    });
  }

  if (cookie.expires) {
    items.push({
      key: "expires",
      label: "Expires",
      children: <Text>{cookie.expires}</Text>,
      span: 3,
    });
  }

  return items;
}

function HARCookieEntry({ cookie }: HARCookieEntryProps) {
  const items = useMemo(() => getCookieDescriptions(cookie), [cookie]);
  return (
    <Col style={{ marginBottom: "16px" }}>
      <Text strong>{cookie.name}</Text>
      <Descriptions size="small" bordered items={items} />
    </Col>
  );
}

export default HARCookieEntry;
