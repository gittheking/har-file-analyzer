import { useMemo } from "react";
import { Typography, Descriptions, Col, Empty } from "antd";
import { Entry } from "../common/types";
import DataRendererCard from "./DataRendererCard";

const { Text } = Typography;

interface HARPostDataViewProps {
  entry: Entry;
}

function getPostDataDescription(entry: Entry) {
  return [
    {
      key: "mime-type",
      label: "Type",
      children: <Text code>{entry.request?.postData?.mimeType}</Text>,
      span: 3,
    },
  ];
}

function HARPostDataView({ entry }: HARPostDataViewProps) {
  const descriptionItems = useMemo(() => getPostDataDescription(entry), [
    entry,
  ]);

  return (
    <Col style={{ padding: "12px 16px" }}>
      <Descriptions size="small" bordered items={descriptionItems} />
      {entry.request?.postData ? (
        <DataRendererCard
          mimeType={entry.request.postData.mimeType}
          content={entry.request.postData.text}
          noContentText="No post data content available for this entry in the HAR file"
          containerClassName="post-data-content"
        />
      ) : (
        <Empty />
      )}
    </Col>
  );
}

export default HARPostDataView;
