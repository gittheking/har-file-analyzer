import React, { useCallback, useEffect, useState } from "react";
import { Card, List, Row, Tag, Radio, RadioChangeEvent } from "antd";
import { Entry, HARFile, HARFileData } from "../common/types";
import { SelectedEntry } from "./FileDataView";

interface HAREntryListProps {
  file: HARFileData;
  onEntrySelect: any;
  selectedEntry: SelectedEntry | null;
}

function getStatusTagColor(status: number) {
  if (status === 0) {
    return "yellow";
  } else if (status < 199) {
    return "blue";
  } else if (status < 299) {
    return "green";
  } else if (status < 399) {
    return "blue";
  } else {
    return "red";
  }
}

type conditionClause = (entry: Entry) => boolean;

// For-loops benchmark faster than Array.filter method
function fasterFilter(entries: Entry[], clause: conditionClause): Entry[] {
  const filteredEntries = [];
  for (let i = 0; i < entries.length - 1; i++) {
    if (clause(entries[i])) {
      filteredEntries.push(entries[i]);
    }
  }
  return filteredEntries;
}

function getEntriesByStatus(entries: Entry[], status: string): Entry[] {
  switch (status) {
    case "all":
      return entries;
    case "aborted":
      return fasterFilter(entries, (entry) => entry.response.status === 0);
    case "1xx":
      return fasterFilter(
        entries,
        (entry) => entry.response.status > 0 && entry.response.status <= 199
      );
    case "2xx":
      return fasterFilter(
        entries,
        (entry) => entry.response.status >= 200 && entry.response.status <= 299
      );
    case "3xx":
      return fasterFilter(
        entries,
        (entry) => entry.response.status >= 300 && entry.response.status <= 399
      );
    case "4xx":
      return fasterFilter(
        entries,
        (entry) => entry.response.status >= 400 && entry.response.status <= 499
      );
    case "5xx":
      return fasterFilter(
        entries,
        (entry) => entry.response.status >= 500 && entry.response.status <= 599
      );
    default:
      return entries;
  }
}

function HAREntryList({
  file,
  onEntrySelect,
  selectedEntry,
}: HAREntryListProps) {
  const [statusValue, setStatusValue] = useState("all");
  const [entries, setEntries] = useState(file.file.log.entries);

  useEffect(() => {
    const nextEntries = getEntriesByStatus(file.file.log.entries, statusValue);
    setEntries(nextEntries);
  }, [statusValue, file.file.log.entries]);

  const handleStatusChange = useCallback((event: RadioChangeEvent) => {
    setStatusValue(event.target.value);
  }, []);

  const handleOnEntrySelect = useCallback((entry: Entry, index: number) => {
    return function (event: React.MouseEvent) {
      onEntrySelect({ entry, index });
    };
  }, []);

  return (
    <Card className="har-entry-card">
      <div
        style={{
          borderBottom: "1px solid rgba(5, 5, 5, 0.06)",
          padding: "16px",
        }}
      >
        <Radio.Group value={statusValue} onChange={handleStatusChange}>
          <Radio value="all">All</Radio>
          <Radio value="aborted">
            <Tag color="yellow" style={{ marginRight: 0 }}>
              Aborted
            </Tag>
          </Radio>
          <Radio value="1xx">
            <Tag color="blue" style={{ marginRight: 0 }}>
              1xx
            </Tag>
          </Radio>
          <Radio value="2xx">
            <Tag color="green" style={{ marginRight: 0 }}>
              2xx
            </Tag>
          </Radio>
          <Radio value="3xx">
            <Tag color="blue" style={{ marginRight: 0 }}>
              3xx
            </Tag>
          </Radio>
          <Radio value="4xx">
            <Tag color="red" style={{ marginRight: 0 }}>
              4xx
            </Tag>
          </Radio>
          <Radio value="5xx">
            <Tag color="red" style={{ marginRight: 0 }}>
              5xx
            </Tag>
          </Radio>
        </Radio.Group>
      </div>
      <List
        className="har-entry-list"
        size={"small"}
        dataSource={entries}
        renderItem={(entry: Entry, idx) => {
          const url = new URL(entry.request.url);
          return (
            <List.Item
              className={
                "entry-list-item" +
                (selectedEntry?.index === idx ? " selected-entry" : "")
              }
              key={file.name + "-entry_" + idx}
              onClick={handleOnEntrySelect(entry, idx)}
            >
              <div style={{ width: "47px" }}>
                <Tag color={getStatusTagColor(entry.response.status)}>
                  {entry.response.status}
                </Tag>
              </div>
              <div style={{ width: "75px" }}>
                <Tag>{entry.request.method}</Tag>
              </div>
              <List.Item.Meta
                title={
                  <Row wrap={false}>
                    <div className="ellipsis-overflow entry-url">
                      {url.pathname}
                    </div>
                  </Row>
                }
                description={url.hostname}
              />
            </List.Item>
          );
        }}
      />
    </Card>
  );
}

export default HAREntryList;
