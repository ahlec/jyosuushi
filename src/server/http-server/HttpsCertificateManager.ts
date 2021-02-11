import { readFileSync, watch } from "fs";
import { debounce } from "lodash";
import { SecureContextOptions } from "tls";

import { ONE_SECOND } from "@shared/constants";

import { HttpsServerConfiguration } from "@server/environment";

class HttpsCertificateManager {
  private loaded: SecureContextOptions;

  public constructor(private readonly config: HttpsServerConfiguration) {
    this.readFromDisk();

    watch(
      config.certificateFile,
      "utf-8",
      // Event is potentially spammy on some environments
      // https://github.com/nodejs/node/issues/4464#issuecomment-357975317
      // Chose a large number because we don't need instantaneous updating and
      // this gives certbot time to change all of the files.
      debounce(this.handleCertFileChanged, ONE_SECOND * 5)
    );
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

  private handleCertFileChanged = (): void => {
    console.log(
      "Detected change in HTTPS certificate file. Reloading certificate."
    );
    this.readFromDisk();
  };
}

export default HttpsCertificateManager;
