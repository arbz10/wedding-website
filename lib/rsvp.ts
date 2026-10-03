import { wedding } from "./wedding";

export type Rsvp = {
  name: string;
  email: string;
  attending: "yes" | "no";
  guests?: number;
  meal?: string;
  message?: string;
};

export type FieldErrors = Partial<Record<keyof Rsvp, string>>;

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// Shared by the form (instant feedback) and the API route (the source of truth).
export function parseRsvp(input: Record<string, unknown>): { data?: Rsvp; errors: FieldErrors } {
  const errors: FieldErrors = {};
  const name = str(input.name, 120);
  const email = str(input.email, 200);
  const attending = input.attending;

  if (!name) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email.";
  if (attending !== "yes" && attending !== "no") errors.attending = "Please let us know if you can attend.";

  const data: Rsvp = { name, email, attending: attending as Rsvp["attending"] };
  const message = str(input.message, 1000);
  if (message) data.message = message;

  if (attending === "yes") {
    const guests = Number(input.guests ?? 1);
    if (!Number.isInteger(guests) || guests < 1 || guests > wedding.maxGuests) {
      errors.guests = `Guests must be between 1 and ${wedding.maxGuests}.`;
    } else {
      data.guests = guests;
    }
    const meal = str(input.meal, 40);
    if (meal && !wedding.meals.includes(meal)) errors.meal = "Please pick a meal from the list.";
    else if (meal) data.meal = meal;
  }

  return Object.keys(errors).length ? { errors } : { data, errors };
}
