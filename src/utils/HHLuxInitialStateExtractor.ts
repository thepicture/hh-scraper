export class HHLuxInitialStateExtractor {
  extractAsJSON(html: string): { resume: unknown } {
    const content = html
      .split('id="HH-Lux-InitialState"')[1]
      .split(">")[1]
      .split("</template")[0];

    return JSON.parse(content);
  }
}
