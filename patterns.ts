const directJumps = {
  1: [2, 4, 5, 6, 8],
  2: [1, 3, 4, 5, 6, 7, 9],
  3: [2, 4, 5, 6, 8],
  4: [1, 2, 3, 5, 7, 8, 9],
  5: [1, 2, 3, 4, 6, 7, 8, 9],
  6: [1, 2, 3, 5, 7, 8, 9],
  7: [2, 4, 5, 6, 8],
  8: [1, 3, 4, 5, 6, 7, 9],
  9: [2, 4, 5, 6, 8],
};
const overJumps = {
  1: [
    [3, 2], // 1 -> 3 through 2
    [7, 4], // 1 -> 7 through 4
    [9, 5], // 1 -> 9 through 5
  ],
  2: [
    [8, 5], // 2 -> 8 through 5
  ],
  3: [
    [1, 2], // 3 -> 1 through 2
    [7, 5], // 3 -> 7 though 5
    [9, 6], // 3 -> 9 though 6
  ],
  4: [
    [6, 5], // 4 -> 6 though 5
  ],
  5: [] as number[][], // 5 doesn't have any over-jumps
  6: [
    [4, 5], // 6 -> 4 though 5
  ],
  7: [
    [1, 4], // 7 -> 1 though 4
    [3, 5], // 7 -> 3 though 5
    [9, 8], // 7 -> 9 though 8
  ],
  8: [
    [2, 5], // 8 -> 2 though 5
  ],
  9: [
    [1, 5], // 9 -> 1 though 5
    [3, 6], // 9 -> 3 though 6
    [7, 8], // 9 -> 7 though 8
  ],
};

export function countPatternsFrom(firstPoint: keyof typeof directJumps, length: number) {
  if (length < 1 || length > 9) {
    return 0;
  }

  const patterns: number[][] = [];

  function jumpToNextPoint(previousPoints: number[]) {
    const lastPoint = previousPoints[previousPoints.length - 1] as keyof typeof directJumps;
    const nextDirectPoints = directJumps[lastPoint].filter((point) => !previousPoints.includes(point));
    const nextOverPoints = overJumps[lastPoint]
      .filter(([nextPoint, overPoint]) => previousPoints.includes(overPoint) && !previousPoints.includes(nextPoint))
      .map(([nextPoint]) => nextPoint);
    const nextPoints = [...nextDirectPoints, ...nextOverPoints];

    if (previousPoints.length === length) {
      patterns.push(previousPoints);
      return;
    }

    nextPoints.forEach((nextPoint) => {
      jumpToNextPoint([...previousPoints, nextPoint]);
    });
  }
  jumpToNextPoint([firstPoint]);

  return patterns.length;
}
