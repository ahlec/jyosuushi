// Forked and rewritten from https://github.com/remarkjs/remark-embed-images
// Primary reason:
//   - Better control over specifying root directory for images.

import fs from "fs";
import mimes from "mime";
import path from "path";
import { Node } from "unist";
import { Transformer } from "unified";
import visit from "unist-util-visit";
import { VFile } from "vfile";

const IS_RELATIVE_PATH_REGEX = /^\.{1,2}\//;

interface EmbededImagesConfig {
  rootDirectory: string;
}

interface ImageNode extends Node {
  url?: string;
}

function embededImages(config: EmbededImagesConfig): Transformer {
  return (tree: Node, file: VFile, done): void => {
    let numProcessing = 0;

    function visitor(node: ImageNode): void {
      if (!node.url || !IS_RELATIVE_PATH_REGEX.test(node.url)) {
        return;
      }

      numProcessing++;

      try {
        const imageContents = fs.readFileSync(
          path.resolve(config.rootDirectory, node.url),
          "base64"
        );

        const mime = mimes.getType(path.extname(node.url));

        if (mime) {
          node.url = "data:" + mime + ";base64," + imageContents;
        }

        --numProcessing;
      } catch (err) {
        if (done) {
          done(err, tree, file);
        }
      }
    }

    visit(tree, "image", visitor);

    if (!numProcessing && done) {
      done(null, tree, file);
    }
  };
}

export default embededImages;
