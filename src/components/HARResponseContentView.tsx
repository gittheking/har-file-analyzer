import { Col, Descriptions, Typography } from "antd";
import { Entry } from "../common/types";
import numeral from "numeral";
import { useMemo } from "react";
import DataRendererCard from "./DataRendererCard";

const { Text } = Typography;

interface HARResponseContentViewProps {
  entry: Entry;
}

function getResponseCententDescription(entry: Entry) {
  const items = [
    {
      key: "mime-type",
      label: "Type",
      children: <Text code>{entry.response.content.mimeType}</Text>,
      span: 3,
    },
  ];

  if (entry.response.content?.size) {
    items.push({
      key: "size",
      label: "Size",
      children: (
        <Text>{numeral(entry.response.content.size).format("0.00b")}</Text>
      ),
      span: 3,
    });
  }

  if (entry.response.content?.compression) {
    items.push({
      key: "compression",
      label: "Compression",
      children: <Text code>{entry.response.content.compression}</Text>,
      span: 3,
    });
  }

  return items;
}

function HARResponseContentView({ entry }: HARResponseContentViewProps) {
  const descriptionItems = useMemo(() => getResponseCententDescription(entry), [
    entry,
  ]);

  return (
    <Col className="response-data-view">
      <Descriptions size="small" bordered items={descriptionItems} />
      <DataRendererCard
        mimeType={entry.response.content.mimeType}
        content={entry.response.content.text}
        noContentText="No response content available for this entry in the HAR file"
        containerClassName="response-content"
      />
    </Col>
  );
}

export default HARResponseContentView;
