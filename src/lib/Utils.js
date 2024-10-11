export default function convertTimeMMSS(seconds) {
  if (seconds == null) {
    return null;
  }

  const totalMilliseconds = seconds * 1000;
  const minutes = Math.floor(totalMilliseconds / 60000);
  const remainingMilliseconds = totalMilliseconds % 60000;
  const secondsPart = Math.floor(remainingMilliseconds / 1000);
  const millisecondsPart = remainingMilliseconds % 1000;

  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = secondsPart.toString().padStart(2, "0");
  const formattedMilliseconds = millisecondsPart.toString().padStart(3, "0");

  return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
}
