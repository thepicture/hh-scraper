import * as fs from "fs";

import { JSON_SPACING, NO_REPLACER } from "@/config";

export class JSONSaver {
  saveOrThrow(json: any, subFolder: string): void {
    fs.writeFileSync(
      `export/${subFolder}/${Date.now()}.json`,
      JSON.stringify(json, NO_REPLACER, JSON_SPACING),
      "utf-8"
    );
  }
}
