const possibleJumps = {
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

function log(...args: any[]) {
  if (process.env.CI) {
    return;
  }
  console.log(...args);
}

export function countPatternsFrom(firstPoint: keyof typeof possibleJumps, length: number) {
  if (length < 1 || length > 9) {
    return 0;
  }

  const patterns: number[][] = [];

  function jumpToNextPoint(previousPoints: number[]) {
    const lastPoint = previousPoints[previousPoints.length - 1];
    log('last point:', lastPoint);
    const nextPoints = possibleJumps[lastPoint].filter((point) => !previousPoints.includes(point));
    log('next points:', nextPoints);

    if (previousPoints.length === length) {
      patterns.push(previousPoints);
      log('new pattern:', previousPoints);
      return;
    }

    nextPoints.forEach((nextPoint) => {
      log('\nnext point:', nextPoint);
      jumpToNextPoint([...previousPoints, nextPoint]);
    });
  }
  jumpToNextPoint([firstPoint]);

  log('\npossible patterns:');
  log(patterns);
  return patterns.length;
}
