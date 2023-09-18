import {
  useEffect,
  useState,
  useReducer,
  useMemo,
  useLayoutEffect,
} from "react";
import { Empty, Tabs } from "antd";
import { Entry } from "../common/types";
import HARRequestView from "./HARRequestView";
import HARResponseView from "./HARResponseView";
import HARPostDataView from "./HARPostDataView";
import { SelectedEntry } from "./FileDataView";

interface HAREntryDataProps {
  selectedEntry: SelectedEntry;
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
          {entry ? (
            <HARResponseView entry={entry} />
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
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

function HAREntryList({ selectedEntry: { entry, index } }: HAREntryDataProps) {
  const [tabValue, setTabValue] = useState("request");

  // reset to request tab on entry update
  useLayoutEffect(() => {
    setTabValue("request");
  }, [entry]);

  const items = useMemo(() => getTabItems(entry), [entry]);

  return (
    <Tabs
      animated={{ inkBar: false, tabPane: false }}
      type="card"
      activeKey={tabValue}
      onChange={(tab) => setTabValue(tab)}
      tabBarStyle={{ marginBottom: 0 }}
      items={items}
    />
  );
}

export default HAREntryList;
