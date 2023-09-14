import { useEffect, useState } from "react";
import { Typography, Descriptions, Col } from "antd";
import { Entry } from "../common/types";

const { Text, Paragraph } = Typography;

interface HARPostDataViewProps {
  entry: Entry;
}

function getPostDataDescription(entry: Entry) {
  return [
    {
      key: "mime-type",
      label: "Type",
      children: <Text>{entry.request?.postData?.mimeType}</Text>,
      span: 3,
    },
    {
      key: "content",
      label: "Content",
      children: (
        <div>
          <code style={{ whiteSpace: "pre-wrap" }}>
            {entry.request?.postData?.text}
          </code>
        </div>
      ),
      span: 3,
    },
  ];
}

function HARPostDataView({ entry }: HARPostDataViewProps) {
  const [postDataItems, setPostDataItems] = useState(
    getPostDataDescription(entry)
  );

  useEffect(() => {
    const items = getPostDataDescription(entry);
    setPostDataItems(items);
  }, [entry]);

  return (
    <Col style={{ padding: "12px 16px" }}>
      <Descriptions size="small" bordered items={postDataItems} />
    </Col>
  );
}

export default HARPostDataView;
