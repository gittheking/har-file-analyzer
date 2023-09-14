import React, { useState } from "react";
import { Row, Col } from "antd";
import { Entry, HARFileData } from "../common/types";
import FileTitleCard from "./FileTitleCard";
import HAREntryList from "./HAREntryList";
import HAREntryData from "./HAREntryData";

interface FileDataViewProps {
  file: HARFileData;
}

function FileDataView({ file }: FileDataViewProps) {
  const [entry, setEntry] = useState<Entry | null>(null);

  function handleEntrySelect(selected: Entry | null) {
    setEntry(selected);
  }

  return (
    <Col span={24}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <FileTitleCard file={file} />
        </Col>
        <Col span={12}>
          <HAREntryList file={file.file} onEntrySelect={handleEntrySelect} />
        </Col>
        <Col span={12}>
          <HAREntryData entry={entry} />
        </Col>
      </Row>
    </Col>
  );
}

export default FileDataView;
