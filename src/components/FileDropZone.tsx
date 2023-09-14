import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Typography } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addFile } from "../features/har-file/har-file-slice";
import { HARFile, HARFileData } from "../common/types";
import { hARFileSchema } from "../common/schemas";

const { Paragraph } = Typography;

async function readHarFile(
  acceptedFiles: File[]
): Promise<HARFileData | undefined> {
  // We're only accepting a single file upload at this time
  let file = acceptedFiles[0];

  // if no file read then return undefined
  if (!file) return;

  const data = await file.text();
  const harFile: HARFile = JSON.parse(data);

  // validate type schema using zod parse
  // let function throw a ZodError in the event of a bad file uploaded
  hARFileSchema.parse(harFile);

  return { name: file.name, size: file.size, file: harFile };
}

function FileDropZone() {
  const dispatch = useAppDispatch();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const harFile = await readHarFile(acceptedFiles);
    if (harFile) {
      dispatch(addFile(harFile));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/json": [".har", ".json"],
    },
    multiple: false,
  });

  return (
    <div className="file-dropzone-container">
      <div className="file-dropzone" {...getRootProps()}>
        <CloudUploadOutlined style={{ fontSize: 32, color: "inherit" }} />
        <input {...getInputProps()} />
        {isDragActive ? (
          <Paragraph>Drop the files here ...</Paragraph>
        ) : (
          <Paragraph>Drop HAR file here, or click to select file</Paragraph>
        )}
      </div>
    </div>
  );
}

export default FileDropZone;
