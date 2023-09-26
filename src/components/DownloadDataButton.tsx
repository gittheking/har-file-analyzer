import { DownloadOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";

interface DownloadDataButtonProps {
  mimeType: string;
  encoding: string;
  content: string;
  onDownload?: () => void;
}

function DownloadDataButton({
  mimeType,
  encoding,
  content,
  onDownload = () => {},
}: DownloadDataButtonProps) {
  const href = `data:${mimeType};charset=utf-8;${encoding},${btoa(content)}`;
  return (
    <Tooltip title="Download content">
      <Button
        type="link"
        icon={<DownloadOutlined />}
        target="_blank"
        download="content"
        href={href}
        size="small"
        shape="circle"
        onClick={onDownload}
      />
    </Tooltip>
  );
}

export default DownloadDataButton;
