import { Col, Collapse, Descriptions, Divider, Typography } from "antd";
import statusCodeMap from "../common/statusCodeMap";
import { Entry } from "../common/types";
import { useMemo } from "react";

interface HARRequestViewProps {
  entry: Entry;
}

const { Text } = Typography;

function getResponseStatusText(entry: Entry) {
  const statusCode = entry.response.status;
  const statusText = statusCodeMap.get(entry.response.status);
  return `${statusCode} ${statusText ?? ""}`;
}

function getGeneralDescriptions(entry: Entry) {
  if (entry.response.status === 0) {
    return [
      {
        key: "status",
        label: "Status",
        children: <Text>Aborted</Text>,
        span: 3,
      },
      {
        key: "_error",
        label: "Error",
        children: <Text>{entry.response?._error}</Text>,
        span: 3,
      },
    ];
  } else {
    return [
      {
        key: "status",
        label: "Status",
        children: <Text>{getResponseStatusText(entry)}</Text>,
        span: 3,
      },
      {
        key: "http_version",
        label: "HTTP Version",
        children: <Text>{entry.request.httpVersion}</Text>,
        span: 3,
      },
    ];
  }
}

function getHeadersDescriptions(entry: Entry) {
  return entry.response.headers.map(function (header) {
    return {
      key: header.name,
      label: header.name,
      children: <Text>{header.value}</Text>,
      span: 3,
    };
  });
}

function getCollapseItems(entry: Entry) {
  const items = [
    {
      key: "general",
      label: "General",
      children: (
        <Descriptions
          size="small"
          bordered
          items={getGeneralDescriptions(entry)}
        />
      ),
    },
  ];

  if (entry.response.headers.length > 0) {
    items.push({
      key: "headers",
      label: "Headers",
      children: (
        <Descriptions
          size="small"
          bordered
          items={getHeadersDescriptions(entry)}
        />
      ),
    });
  }

  return items;
}

function HARResponseView({ entry }: HARRequestViewProps) {
  const items = useMemo(() => getCollapseItems(entry), [entry]);
  return (
    <Col className="response-data-view">
      <Collapse defaultActiveKey={["general"]} ghost items={items} />
    </Col>
  );
}

export default HARResponseView;
