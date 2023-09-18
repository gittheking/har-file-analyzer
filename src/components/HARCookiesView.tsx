import { useMemo } from "react";
import { Col, Collapse, Typography } from "antd";
import HARCookieEntry from "./HARCookieEntry";
import { Entry, Cookie } from "../common/types";

interface HARCookiesViewProps {
  entry: Entry;
}

const { Text } = Typography;

function getCollapseItems(entry: Entry) {
  return [
    {
      key: "request",
      label: "Request",
      children:
        entry.request.cookies.length > 0 ? (
          entry.request.cookies.map((cookie: Cookie) => (
            <HARCookieEntry key={cookie.name} cookie={cookie} />
          ))
        ) : (
          <Text italic>No Request Cookies</Text>
        ),
    },
    {
      key: "response",
      label: "Response",
      children:
        entry.response.cookies.length > 0 ? (
          entry.response.cookies.map((cookie: Cookie) => (
            <HARCookieEntry key={cookie.name} cookie={cookie} />
          ))
        ) : (
          <Text italic>No Response Cookies</Text>
        ),
    },
  ];
}

function HARCookiesView({ entry }: HARCookiesViewProps) {
  const items = useMemo(() => getCollapseItems(entry), [entry]);
  return (
    <Col>
      <Collapse defaultActiveKey={"request"} ghost items={items} />
    </Col>
  );
}

export default HARCookiesView;
