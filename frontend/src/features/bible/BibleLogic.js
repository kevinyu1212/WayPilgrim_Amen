export const calculateProgress = (readChapters, totalChapters) => {
  if (totalChapters === 0) return 0;
  return (readChapters / totalChapters) * 100;
};
