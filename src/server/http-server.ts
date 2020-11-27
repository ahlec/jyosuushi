import { readFileSync } from "fs";
import {
  createServer as createHttpServerInternal,
  IncomingMessage,
  Server,
  ServerResponse,
} from "http";
import { createServer as createHttpsServerInternal } from "https";

import { ServerConfig } from "./environment";

type RequestHandlerFn = (
  request: IncomingMessage,
  response: ServerResponse
) => unknown;

export function startHttpServer(
  config: ServerConfig,
  requestHandler: RequestHandlerFn,
  onListening: (url: string) => void
): void {
  let server: Server;
  switch (config.protocol) {
    case "http": {
      server = createHttpServerInternal(requestHandler);
      break;
    }
    case "https": {
      const privateKey = readFileSync(config.privateKeyFile, "utf-8");
      const certificate = readFileSync(config.certificateFile, "utf-8");
      const ca = readFileSync(config.caFile, "utf-8");
      server = createHttpsServerInternal(
        {
          ca,
          cert: certificate,
          key: privateKey,
        },
        requestHandler
      );
      break;
    }
  }

  server.listen(config.portNumber, (): void => {
    onListening(`${config.protocol}://localhost:${config.portNumber}`);
  });
}
