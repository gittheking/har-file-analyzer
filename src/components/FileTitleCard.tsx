import { Card, Descriptions, Button } from "antd";
import numeral from "numeral";
import { FileFilled } from "@ant-design/icons";
import { HARFileData } from "../common/types";
import { removeFile } from "../features/har-file/har-file-slice";
import DescriptionsItem from "antd/es/descriptions/Item";
import { useAppDispatch } from "../app/hooks";

interface FileProps {
  file: HARFileData;
}

function FileCard({ file: { name, size, file } }: FileProps) {
  const dispatch = useAppDispatch();

  function handleRemoveFile() {
    dispatch(removeFile());
  }

  return (
    <Card
      size="small"
      title={
        <>
          <FileFilled />
          <span style={{ marginLeft: "0.5rem" }}>{name}</span>
        </>
      }
      extra={
        <Button onClick={handleRemoveFile} danger type="text">
          Remove File
        </Button>
      }
    >
      <Descriptions bordered size="small">
        <DescriptionsItem label="size">
          {numeral(size).format("0,0.00b")}
        </DescriptionsItem>
        <DescriptionsItem label="creator">
          {file.log.creator?.name}
          {" v"}
          {file.log.creator?.version}
        </DescriptionsItem>
        <DescriptionsItem label="entries">
          {file.log.entries.length}
        </DescriptionsItem>
      </Descriptions>
    </Card>
  );
}

export default FileCard;
