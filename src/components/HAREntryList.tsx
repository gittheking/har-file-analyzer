import React, { useEffect, useState } from "react";
import { Card, List, Row, Tag, Radio, RadioChangeEvent } from "antd";
import { Entry, HARFile } from "../common/types";

interface HAREntryListProps {
  file: HARFile;
  onEntrySelect: (entry: Entry | null) => void;
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

function HAREntryList({ file, onEntrySelect }: HAREntryListProps) {
  const [statusValue, setStatusValue] = useState("all");
  const [entries, setEntries] = useState(file.log.entries);

  function handleStatusChange(event: RadioChangeEvent) {
    setStatusValue(event.target.value);
  }

  function toggleSelectedClass(selectedEl: Element | null) {
    // find previously selected list item
    const currentSelected = document.querySelector(".selected-entry");
    // remove class to highlight item if exists
    currentSelected?.classList.remove("selected-entry");
    // add selected-entry class to next selected list item
    selectedEl?.classList.add("selected-entry");
  }

  function handleOnEntrySelect(entry: Entry) {
    return function (event: React.MouseEvent) {
      if (event.target instanceof Element) {
        const listItem = event.target.closest(".entry-list-item");
        toggleSelectedClass(listItem);
      }
      onEntrySelect(entry);
    };
  }

  useEffect(() => {
    const nextEntries = getEntriesByStatus(file.log.entries, statusValue);
    setEntries(nextEntries);
  }, [statusValue, file.log.entries]);

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
          <Radio value="aborted">Aborted</Radio>
          <Radio value="1xx">1xx</Radio>
          <Radio value="2xx">2xx</Radio>
          <Radio value="3xx">3xx</Radio>
          <Radio value="4xx">4xx</Radio>
          <Radio value="5xx">5xx</Radio>
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
              className="entry-list-item"
              key={entry.time + "-" + entry.request.url + "_" + idx}
              onClick={handleOnEntrySelect(entry)}
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
