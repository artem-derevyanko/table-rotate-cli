export const chunkBy = <T>(list: T[], size: number) => {
  const chunks: T[][] = [];

  for (let i = 0; i < list.length; i += size) {
    chunks.push(list.slice(i, i + size));
  }

  return chunks;
};
