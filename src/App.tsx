import React from "react";
import FileDropZone from "./components/FileDropZone";
import "./App.css";
import Layout, { Header, Content } from "antd/es/layout/layout";
import { Typography } from "antd";
import { FileSearchOutlined } from "@ant-design/icons";
import { useAppSelector } from "./app/hooks";
import FileDataView from "./components/FileDataView";

const { Title } = Typography;

function App() {
  const file = useAppSelector((state) => state.harFile.data);

  return (
    <Layout className="app-layout">
      <Header className="app-header">
        <FileSearchOutlined className="app-header-icon" />
        <Title level={2}>HAR File Analyzer</Title>
      </Header>
      <Content className="app-content">
        {file ? <FileDataView file={file} /> : <FileDropZone />}
      </Content>
    </Layout>
  );
}

export default App;
