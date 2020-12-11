export const minutesInMilliseconds = (minutes: number) => minutes * 1000 * 60;
export const hoursInMilliseconds = (hours: number) => hours * 1000 * 60 * 60;
export const daysInMilliseconds = (days: number) => days * 1000 * 60 * 60 * 24;
export const toUnix = (value: number) => Math.round(value / 1000);
export const fromUnixToISO = (value: number) => new Date(value * 1000).toISOString();
