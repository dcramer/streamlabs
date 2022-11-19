export default function formatDuration(seconds: number) {
  let res = [];
  let rem = seconds;

  if (seconds === 0) {
    return "now";
  }

  const duration: [string, number][] = [
    ["y", 60 * 60 * 24 * 365],
    ["d", 60 * 60 * 24],
    ["h", 60 * 60],
    ["m", 60],
    ["s", 1],
  ];
  for (let item of duration) {
    if (rem >= item[1]) {
      let unit = Math.floor(rem / item[1]);
      const text = `${unit}${item[0]}`;
      res.push(text);
      rem = rem % item[1];
    }
  }
  let resText = "";
  res.forEach((value, index) => {
    if (index > 0 && index < res.length - 1) {
      resText += " ";
    } else if (index === res.length - 1 && res.length > 1) {
      resText += " ";
    }
    resText += value;
  });
  return resText;
}
