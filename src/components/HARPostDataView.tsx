import { useMemo } from "react";
import { Typography, Descriptions, Col, Empty, Card, Tabs, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { Entry, PostData } from "../common/types";
import ContentRenderer from "./ContentRenderer";

const { Text, Paragraph } = Typography;

interface HARPostDataViewProps {
  entry: Entry;
}

interface DownloadPostDataButtonProps {
  postData: PostData;
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

function getContentTabItems(postData: PostData | undefined) {
  if (!postData) return [];

  return [
    {
      key: "raw",
      label: "Raw",
      children: <Text>{postData.text}</Text>,
    },
    {
      key: "parsed",
      label: "Parsed",
      children: (
        <ContentRenderer mimeType={postData.mimeType} content={postData.text} />
      ),
    },
  ];
}

function DownloadPostDataButton({ postData }: DownloadPostDataButtonProps) {
  const href = `data:${postData.mimeType};charset=utf-8;base64,${btoa(
    postData.text
  )}`;
  return (
    <Button
      type="link"
      icon={<DownloadOutlined />}
      target="_blank"
      download="content"
      href={href}
      size="small"
    >
      Download Content
    </Button>
  );
}

function HARPostDataView({ entry }: HARPostDataViewProps) {
  const descriptionItems = useMemo(() => getPostDataDescription(entry), [
    entry,
  ]);
  const tabItems = useMemo(() => getContentTabItems(entry.request.postData), [
    entry,
  ]);

  return (
    <Col style={{ padding: "12px 16px" }}>
      <Descriptions size="small" bordered items={descriptionItems} />
      <Card className="post-data-content">
        {entry.request?.postData ? (
          <Tabs
            defaultActiveKey="raw"
            items={tabItems}
            tabBarExtraContent={
              <DownloadPostDataButton postData={entry.request.postData} />
            }
          />
        ) : (
          <Empty />
        )}
      </Card>
    </Col>
  );
}

export default HARPostDataView;
