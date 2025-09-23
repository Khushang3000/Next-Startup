import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format date function, now we just need to use it there in the StartupCard.tsx
export function formatDate(date: string){
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

// export function parse({error, status}: {error: Error, status: string}): boolean{
// return true;
// }
//can not do return 1;, or return "Hi" as they are not boolean.

export function parseServerActionResponse<T>(response: T) {
return JSON.parse(JSON.stringify(response));
}