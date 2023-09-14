import { useEffect, useState } from "react";
import { Empty, Tabs } from "antd";
import { Entry } from "../common/types";
import HARRequestView from "./HARRequestView";
import HARPostDataView from "./HARPostDataView";

interface HAREntryData {
  entry: Entry | null;
}

interface TabContainerProps {
  children: string | JSX.Element | JSX.Element[];
}

function TabContainer({ children }: TabContainerProps) {
  return <div className="entry-data-tab-children-container">{children}</div>;
}

function getTabItems(entry: Entry | null) {
  let items = [
    {
      label: "Request",
      key: "request",
      children: (
        <TabContainer>
          {entry ? (
            <HARRequestView entry={entry} />
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </TabContainer>
      ),
    },
    {
      label: "Response",
      key: "response",
      children: (
        <TabContainer>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </TabContainer>
      ),
    },
    {
      label: "Response Content",
      key: "response-content",
      children: (
        <TabContainer>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </TabContainer>
      ),
    },
    {
      label: "Cookies",
      key: "cookies",
      children: (
        <TabContainer>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </TabContainer>
      ),
    },
    {
      label: "Timing",
      key: "timing",
      children: (
        <TabContainer>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </TabContainer>
      ),
    },
  ];

  // Add Post Data tab when present in request
  if (entry?.request?.postData) {
    items = [
      ...items.slice(0, 1),
      {
        label: "Post Data",
        key: "post-data",
        children: (
          <TabContainer>
            <HARPostDataView entry={entry} />
          </TabContainer>
        ),
      },
      ...items.slice(1),
    ];
  }

  return items;
}

function HAREntryList({ entry }: HAREntryData) {
  const [tabValue, setTabValue] = useState("request");
  const [tabItems, setTabItems] = useState(getTabItems(entry));

  useEffect(() => {
    const items = getTabItems(entry);
    console.log(items);
    setTabItems(items);
  }, [entry]);

  return (
    <Tabs
      type="card"
      activeKey={tabValue}
      onChange={(tab) => setTabValue(tab)}
      tabBarStyle={{ marginBottom: 0 }}
      items={tabItems}
    />
  );
}

export default HAREntryList;
