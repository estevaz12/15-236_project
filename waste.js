function wasteEms(recycled, dollars) {
  const emFactor = 4121;
  const totalWasteEms = dollars * emFactor;
  const saveConst = 1308.6; // kg/ton RECYCLED
  const savings = recycled * saveConst;
  return totalWasteEms - savings;
}
