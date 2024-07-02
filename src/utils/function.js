export const getDateTime = (dt) => {
  const dT = dt.split(".")[0].split("T");
  return `${dT[0]} ${dT[1]}`;
};
