export const reorderObject = (obj: Record<string, string>) => {
  const orderedKeys = ['type', 'myAccount', 'receiverAccount', 'amount'];
  const newObj: Record<string, string> = {};

  orderedKeys.forEach((key) => {
    if (key in obj) {
      newObj[key] = obj[key];
    }
  });

  return newObj;
};
