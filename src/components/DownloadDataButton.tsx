import { DownloadOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { useEffect, useState } from "react";

interface DownloadDataButtonProps {
  mimeType: string;
  content: string;
  onDownload?: () => void;
}

async function getDataURL(mimeType: string, content: string): Promise<string> {
  return new Promise(function (resolve, reject) {
    const blob = new Blob([content], { type: mimeType });
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      }
      reject(new Error("Invalid file content type"));
    };
  });
}

function DownloadDataButton({
  mimeType,
  content,
  onDownload = () => {},
}: DownloadDataButtonProps) {
  const [href, setHref] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const dataUrl = await getDataURL(mimeType, content);
      setHref(dataUrl);
    })();
  }, [mimeType, content]);

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
