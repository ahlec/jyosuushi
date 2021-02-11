import {
  createServer as createHttpServerInternal,
  IncomingMessage,
  Server,
  ServerResponse,
} from "http";
import { createServer as createHttpsServerInternal } from "https";

import { ServerConfig } from "@server/environment";

import HttpsCertificateManager from "./HttpsCertificateManager";

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
      const certManager = new HttpsCertificateManager(config);
      server = createHttpsServerInternal(certManager.current, requestHandler);
      break;
    }
  }

  server.listen(config.portNumber, (): void => {
    onListening(`${config.protocol}://localhost:${config.portNumber}`);
  });
}
