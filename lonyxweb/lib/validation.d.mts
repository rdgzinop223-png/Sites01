export function validateBrief(values: {
  name: string;
  email: string;
  service: string;
  message: string;
  consent: boolean;
}): Record<string, string>;
export function scrollTime(progress: number, duration: number): number;
