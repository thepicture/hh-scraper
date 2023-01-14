import * as cheerio from "cheerio";
import * as humps from "humps";

import { Selectors } from "@/config";
import { Adapter, Resume, ResumeSearchParams } from "@/scrapers";
import { HHAdapterScrapingError } from "@/types";
import { HHLuxInitialStateExtractor } from "@/utils";

export class HHAdapter implements Adapter {
  async scrapeResumes(searchParams: ResumeSearchParams): Promise<unknown[]> {
    try {
      return await this._scrapAsJSONOrThrow(searchParams);
    } catch (error) {
      console.error(error);
      throw new HHAdapterScrapingError(error);
    }
  }

  private async _scrapAsJSONOrThrow(
    searchParams: ResumeSearchParams
  ): Promise<unknown[]> {
    const urlParams = new URLSearchParams();

    insertSearchParamsIntoURLParams(searchParams, urlParams);

    const url = makeURL(searchParams);
    url.search = urlParams.toString();

    const response = await fetch(url.toString());
    const html = await response.text();

    const $ = cheerio.load(html);
    const links = this.extractResumeLinks($);

    const resumes = await Promise.all(this._fetchResumes(links, searchParams));

    return resumes;
  }

  private extractResumeLinks($: cheerio.CheerioAPI): string[] {
    return [
      ...$(Selectors.RESUME_LINK).map((_, element) => $(element).attr("href")),
    ];
  }

  private _fetchResumes(
    resumeLinks: string[],
    searchParams: ResumeSearchParams
  ): Promise<unknown>[] {
    const extractor = new HHLuxInitialStateExtractor();

    return resumeLinks.map(async (link) => {
      const url = `https://${searchParams.subdomain}.hh.ru${link}`;

      const response = await fetch(url);
      const html = await response.text();

      const { resume } = extractor.extractAsJSON(html);
      return resume;
    });
  }
}

function makeURL(searchParams: ResumeSearchParams): URL {
  return new URL(`https://${searchParams.subdomain}.hh.ru/search/resume`);
}

function insertSearchParamsIntoURLParams(
  searchParams: ResumeSearchParams,
  urlParams: URLSearchParams
): void {
  for (const key in searchParams) {
    appendSearchParam(searchParams, key, urlParams);
  }
}

function appendSearchParam(
  searchParams: ResumeSearchParams,
  key: string,
  params: URLSearchParams
): void {
  const entry = searchParams[key];

  const paramKey = humps.decamelize(key);

  if (Array.isArray(entry)) {
    for (const value of entry) {
      params.append(paramKey, String(value));
    }
  } else {
    params.append(paramKey, String(entry));
  }
}
