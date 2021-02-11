import { readFileSync } from "fs";
import { SecureContextOptions } from "tls";

import { HttpsServerConfiguration } from "@server/environment";

class HttpsCertificateManager {
  private loaded: SecureContextOptions;

  public constructor(private readonly config: HttpsServerConfiguration) {
    this.readFromDisk();
  }

  public get current(): SecureContextOptions {
    return this.loaded;
  }

  private readFromDisk(): void {
    const privateKey = readFileSync(this.config.privateKeyFile, "utf-8");
    const certificate = readFileSync(this.config.certificateFile, "utf-8");
    const ca = readFileSync(this.config.caFile, "utf-8");
    this.loaded = {
      ca,
      cert: certificate,
      key: privateKey,
    };
  }
}

export default HttpsCertificateManager;
