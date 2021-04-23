function wasteEms(recycle, dollars) {
  const emFactor = 4121;
  const totalWasteEms = dollars * emFactor;
  if(recycle) {
    const saveConst = 1308.6; // kg/ton is a weird metric, and this number does not square with metric tons
    const savings = totalWasteEms * saveConst / 1000;
    return totalWasteEms - savings;
  }
  return totalWasteEms;
}
