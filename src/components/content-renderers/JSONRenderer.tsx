import { useMemo, useState } from "react";
import { CaretDownFilled } from "@ant-design/icons";

interface JSONRendererProps {
  content: string;
}

interface JSONTreeProps {
  data: any;
  depth?: number;
}

interface PrimitiveValueProps {
  value: string | boolean | number;
}

interface TreeSwitcherProps {
  open: boolean;
  onChange: () => void;
}

function PrimitiveValue({ value }: PrimitiveValueProps) {
  if (typeof value === "string") {
    return <span className="value">"{value}"</span>;
  } else {
    return <span className="value">{value}</span>;
  }
}

function TreeSwitcher({ open, onChange }: TreeSwitcherProps) {
  return (
    <div
      className={"tree-switcher-icon-clickable " + (open ? "" : "closed")}
      onClick={onChange}
    >
      <span style={{ fontSize: 10 }}>
        <CaretDownFilled width="1em" height="1em" />
      </span>
    </div>
  );
}

function JSONTree({ data, depth = 0 }: JSONTreeProps) {
  // Set depth level 0 to open and rest closed
  const [open, setOpen] = useState(() => depth === 0);

  const handleSwitcherClick = () => setOpen((o) => !o);

  switch (typeof data) {
    case "string":
    case "number":
    case "boolean":
      return <PrimitiveValue value={data} />;
    case "object":
      const isArray = Array.isArray(data);
      const objKeys = Object.keys(data);
      return (
        <div style={{ paddingLeft: 24, position: "relative" }}>
          <TreeSwitcher open={open} onChange={handleSwitcherClick} />
          {open ? (
            <ul className={"tree-list " + (isArray ? "array" : "object")}>
              {objKeys.map(function (objKey, idx) {
                return (
                  <li className="tree-list-item" key={objKey}>
                    "<span className="key">{objKey}</span>":{" "}
                    <JSONTree data={data[objKey]} depth={depth + 1} />
                    {idx < objKeys.length - 1 ? "," : ""}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div
              style={{ height: "24px", lineHeight: "24px", paddingTop: "1px" }}
            >
              {isArray ? "[ ... ]" : "{ ... }"}
            </div>
          )}
        </div>
      );
    default:
      return null;
  }
}

function JSONRenderer({ content }: JSONRendererProps) {
  const data: any = useMemo(() => JSON.parse(content), [content]);
  return (
    <div className="json-tree-container">
      <JSONTree data={data} />
    </div>
  );
}

export default JSONRenderer;
