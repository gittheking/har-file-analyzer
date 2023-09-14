import { Col, Collapse, Descriptions, Divider, Typography } from "antd";
import { Entry } from "../common/types";

interface HARRequestViewProps {
  entry: Entry;
}

const { Text } = Typography;

function getGeneralDescriptions(entry: Entry) {
  return [
    {
      key: "start_time",
      label: "Start Time",
      children: <Text>{entry.startedDateTime}</Text>,
      span: 3,
    },
    {
      key: "req_url",
      label: "Request URL",
      children: <Text>{entry.request.url}</Text>,
      span: 3,
    },
    {
      key: "http_version",
      label: "HTTP Version",
      children: <Text>{entry.request.httpVersion}</Text>,
      span: 3,
    },
    {
      key: "http_method",
      label: "HTTP Method",
      children: <Text>{entry.request.method}</Text>,
      span: 3,
    },
  ];
}

function getHeadersDescriptions(entry: Entry) {
  return entry.request.headers.map(function (header) {
    return {
      key: header.name,
      label: header.name,
      children: <Text>{header.value}</Text>,
      span: 3,
    };
  });
}

function getQSDescriptions(entry: Entry) {
  return entry.request.queryString.map(function (qs) {
    return {
      key: qs.name,
      label: qs.name,
      children: <Text>{qs.value}</Text>,
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

  if (entry.request.headers.length > 0) {
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
  if (entry.request.queryString.length > 0) {
    items.push({
      key: "queryStrings",
      label: "Query String Params",
      children: (
        <Descriptions size="small" bordered items={getQSDescriptions(entry)} />
      ),
    });
  }
  return items;
}

function HARRequestView({ entry }: HARRequestViewProps) {
  return (
    <Col className="request-data-view">
      <Collapse
        defaultActiveKey={["general"]}
        ghost
        items={getCollapseItems(entry)}
      />
    </Col>
  );
}

export default HARRequestView;
