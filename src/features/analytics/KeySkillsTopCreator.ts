export class KeySkillsTopCreator {
  create(resumes: any[]): { skill: string; occurences: number }[] {
    const skills: string[] = resumes.flatMap((resume) =>
      resume.keySkills.value.map((value: { string: string }) => value.string)
    );

    const accumulator: Map<string, { skill: string; occurences: number }> =
      new Map();

    for (const skill of skills) {
      if (accumulator.has(skill)) {
        accumulator.get(skill).occurences++;
      } else {
        accumulator.set(skill, { skill, occurences: 1 });
      }
    }

    return [...accumulator.values()].sort(
      (s1, s2) => s2.occurences - s1.occurences
    );
  }
}
