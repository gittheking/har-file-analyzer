import { Card, Tabs, Typography, message } from "antd";
import ContentRenderer from "./ContentRenderer";
import DownloadDataButton from "./DownloadDataButton";
import CopyDataToClipboardButton from "./CopyDataToClipboardButton";

interface DataRendererCardProps {
  mimeType: string;
  content?: string;
  noContentText?: string;
  containerClassName?: string;
}

const { Text } = Typography;

function getContentTabItems(
  mimeType: string,
  content?: string,
  noContentText: string = "No content"
) {
  if (!content) {
    return [
      {
        key: "raw",
        label: "Raw",
        children: <Text italic>{noContentText}</Text>,
      },
    ];
  }

  return [
    {
      key: "raw",
      label: "Raw",
      children: <Text>{content}</Text>,
    },
    {
      key: "parsed",
      label: "Parsed",
      children: <ContentRenderer mimeType={mimeType} content={content} />,
    },
  ];
}

function DataRendererCard({
  mimeType,
  content,
  noContentText,
  containerClassName = "",
}: DataRendererCardProps) {
  const [messageApi, contextHolder] = message.useMessage();
  const tabItems = getContentTabItems(mimeType, content, noContentText);
  return (
    <Card className={containerClassName}>
      {contextHolder}
      <Tabs
        defaultActiveKey="raw"
        items={tabItems}
        tabBarExtraContent={
          content && (
            <>
              <CopyDataToClipboardButton
                mimeType={mimeType}
                content={content}
                onSuccess={() => messageApi.info("Content copied to clipboard")}
                onFailure={(message) => {
                  if (message) {
                    messageApi.error(
                      `Failed to copy data to clipboard. Error: ${message}`
                    );
                  } else {
                    messageApi.error("Failed to copy data to clipboard");
                  }
                }}
                className="data-renderer-card_copy-button"
              />
              <DownloadDataButton
                mimeType={mimeType}
                content={content}
                onDownload={() => messageApi.info("Content download initiated")}
              />
            </>
          )
        }
      />
    </Card>
  );
}

export default DataRendererCard;
