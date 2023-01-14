import { HHAdapter } from "@/adapters";
import { KeySkillsTopCreator } from "@/features";
import { HHScraper } from "@/scrapers";
import { JSONSaver } from "@/utils";

import { searchParams } from "../search-params";

const scraper = new HHScraper({
  adapter: new HHAdapter(),
});

const subfolderName = "resumes";

scraper
  .scrapeResumes(searchParams)
  .then((resumes) => {
    new JSONSaver().saveOrThrow(resumes, subfolderName);

    const keySkillsTopCreator = new KeySkillsTopCreator();
    console.log(keySkillsTopCreator.create(resumes));
  })
  .catch((reason) => console.error(reason));
