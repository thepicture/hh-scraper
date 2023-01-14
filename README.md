# hh-scraper

Scrapes HH resumes and makes top of hardskills.

## Application

Scraper helps understand developers what are pespectives now on market.

## Functions

- scrape resumes
- export to JSON array
- make top of resume skills

## Installation

```bash
git clone https://github.com/thepicture/hh-scraper.git
```

```bash
cd ./hh-scraper
```

```bash
npm i
```

```bash
npm start
```

## Configuration

All configuration should be presented in `search-params.ts` file in the root directory

```bash
touch ./search-params.ts
```

```bash
vim ./search-params.ts
```

## Configuration File Example

Configuration file `search-params.ts` should be presented in the root directory. It contains an object the keys of which will be used as params for URL.

```js
export const searchParams = {
  areas: [1, 2, ..., 3], // location codes from HH
  relocation: "living_or_relocation",
  gender: "unknown",
  text: "...", // any query to search
  logic: "normal",
  pos: "full_text",
  expPeriod: "all_time",
  searchPeriod: 0,
  subdomain: "moscow", // change the city if necessary
  itemsOnPage: 100,
};
```

You can add another params and they will be parsed by the app. Or you can remove params.

# Export

Scraper saves resume results as JSON files to `export/resumes` folder, with the filename as UNIX timestamp. The folders should exist to work correctly.

### Rules Of Search Params

If the value of the key is array, then multiple params with the same key will be used, like `areas` value does. Array values will be stringified as if it would apply `String` function to every value.

Otherwise, value will be parsed as a string with the unique key.
