export enum BusinessMode {
  retail = "retail",
  grocery = "grocery",
  restaurant = "restaurant",
}

export function businessModeFromString(value: string): BusinessMode {
  const match = Object.values(BusinessMode).find((m) => m === value);
  return match ?? BusinessMode.retail;
}
