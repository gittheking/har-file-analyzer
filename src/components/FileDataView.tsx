import React, { useCallback, useState } from "react";
import { Row, Col } from "antd";
import { Entry, HARFileData } from "../common/types";
import FileTitleCard from "./FileTitleCard";
import HAREntryList from "./HAREntryList";
import HAREntryData from "./HAREntryData";

interface FileDataViewProps {
  file: HARFileData;
}

export interface SelectedEntry {
  entry: Entry;
  index: number;
}

function FileDataView({ file }: FileDataViewProps) {
  const [selected, setSelected] = useState<SelectedEntry | null>(null);

  const handleEntrySelect = useCallback(
    (nextSelected: SelectedEntry | null) => {
      // toggle selected entry
      if (nextSelected?.index === selected?.index) {
        setSelected(null);
      } else {
        setSelected(nextSelected);
      }
    },
    [selected]
  );

  return (
    <Col span={24}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <FileTitleCard file={file} />
        </Col>
        <Col span={selected ? 12 : 24}>
          <HAREntryList
            file={file}
            onEntrySelect={handleEntrySelect}
            selectedEntry={selected}
          />
        </Col>
        {selected && (
          <Col span={12}>
            <HAREntryData selectedEntry={selected} />
          </Col>
        )}
      </Row>
    </Col>
  );
}

export default FileDataView;
