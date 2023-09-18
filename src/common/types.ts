// HAR 1.2 spec
// http://www.softwareishard.com/blog/har-12-spec/

export interface HARFileData {
  name: string;
  size: number;
  file: HARFile;
}

export interface HARFile {
  log: {
    creator?: Creator;
    browser?: Browser;
    pages?: Page[];
    entries: Entry[];
  };
}

export interface Creator {
  name: string;
  version: string;
}

export interface Browser {
  name: string;
  version: string;
}

export interface Page {
  staredDateTime?: string;
  id: string;
  title: string;
  pageTimings: PageTimings;
}

export interface PageTimings {
  onContentLoad?: number;
  onLoad?: number;
}

export interface Entry {
  pageref?: string;
  startedDateTime: string;
  time: number;
  request: Request;
  response: Response;
  timings: Timings;
  serverIPAddress?: string;
  connection?: string;
}

export interface Request {
  method: requestMethod;
  url: string;
  httpVersion: string;
  cookies: Cookie[];
  headers: Header[];
  queryString: QueryString[];
  postData?: PostData;
  headersSize: number;
  bodySize: number;
}

export interface Response {
  status: number;
  statusText: string;
  httpVersion: string;
  cookies: Cookie[];
  headers: Header[];
  content: ResponseContent;
  redirectURL: string;
  headersSize: number;
  bodySize: number;
  _error?: string;
}

export type requestMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "OPTIONS"
  | "TRACE"
  | "HEAD";

export interface Cookie {
  name: string;
  value: string;
  path?: string;
  expires?: string | null;
  httpOnly?: boolean;
  secure?: boolean;
}

export interface Header {
  name: string;
  value: string;
}

export interface QueryString {
  name: string;
  value: string;
}

export interface PostData {
  mimeType: string;
  params?: PostDataParams[];
  text: string;
}

export interface PostDataParams {
  name: string;
  value?: string;
  fileName?: string;
  contentType?: string;
}

export interface ResponseContent {
  size: number;
  compression?: number;
  mimeType: string;
  text?: string;
  encoding?: string;
}

export interface Timings {
  blocked?: number;
  dns?: number;
  connect?: number;
  send: number;
  wait: number;
  receive: number;
  ssl?: number;
}
