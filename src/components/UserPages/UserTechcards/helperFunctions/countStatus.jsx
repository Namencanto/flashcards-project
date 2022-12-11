export function countStatus(arr) {
  // create an object to store the count of each value
  const counts = {
    learned: 0,
    knowed: 0,
    new: 0,
    toLearn: 0,
    hard: 0,
  };

  // iterate over the array and increment the count for each value
  for (const value of arr) {
    if (value === 0) {
      counts.learned += 1;
    } else if (value >= 1 && value <= 4) {
      counts.known += 1;
    } else if (value === 5) {
      counts.new += 1;
    } else if (value >= 6 && value <= 8) {
      counts.toLearn += 1;
    } else if (value >= 9 && value <= 10) {
      counts.hard += 1;
    }
  }

  return counts;
}
