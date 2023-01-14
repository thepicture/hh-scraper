export interface Resume {}

export interface Adapter {
  scrapeResumes: (searchParams: ResumeSearchParams) => Promise<Resume[]>;
}

export interface ResumeSearchParams {
  areas: number[];
  relocation: string;
  gender: string;
  text: string;
  logic: string;
  pos: string;
  expPeriod: string;
  searchPeriod: number;
  subdomain: string;
}

export interface HHSCraperConstructorProps {
  adapter: Adapter;
}

export class HHScraper {
  adapter: Adapter;
  constructor({ adapter }: HHSCraperConstructorProps) {
    this.adapter = adapter;
  }

  async scrapeResumes(searchParams: ResumeSearchParams) {
    return await this.adapter.scrapeResumes(searchParams);
  }
}
