"use client";

import { useState, type FormEvent } from "react";
import { wedding } from "@/lib/wedding";
import { parseRsvp, type FieldErrors } from "@/lib/rsvp";
import { Heart, SectionHead } from "./Ornaments";
import Reveal from "./Reveal";

type Wish = { name: string; message: string };

export default function Rsvp() {
  const [attending, setAttending] = useState<"yes" | "no" | "">("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [sending, setSending] = useState(false);
  const [thanks, setThanks] = useState("");
  const [wishes, setWishes] = useState<Wish[]>(wedding.wishes);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.currentTarget).entries());

    const { data, errors: found } = parseRsvp(raw);
    setErrors(found);
    if (!data) {
      setFormError("Please check the highlighted fields.");
      return;
    }
    setFormError("");
    setSending(true);

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: raw.website }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrors(json.errors ?? {});
        throw new Error(json.error);
      }

      const first = data.name.split(/\s+/)[0];
      setThanks(
        data.attending === "yes"
          ? `${first}, we can't wait to celebrate with you!`
          : `${first}, we'll miss you — thank you for letting us know.`
      );
      if (data.message) setWishes((w) => [{ name: data.name, message: data.message! }, ...w]);
    } catch (err) {
      setFormError(err instanceof Error && err.message ? err.message : "Sorry, something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  const invalid = (k: keyof FieldErrors) => (errors[k] ? "is-invalid" : "");

  return (
    <>
      <section className="section rsvp" id="rsvp">
        <div className="container">
          <Reveal className="rsvp__card">
            <SectionHead eyebrow="Will you join us?" title="RSVP">
              <p className="rsvp__deadline">
                Kindly respond by <strong>{wedding.rsvpBy}</strong>
              </p>
            </SectionHead>

            {thanks ? (
              <div className="rsvp__thanks" role="status">
                <Heart />
                <h3 className="script">Thank you!</h3>
                <p>{thanks}</p>
              </div>
            ) : (
              <form className={`rsvp__form ${attending === "no" ? "is-declining" : ""}`} onSubmit={onSubmit} noValidate>
                <div className="field">
                  <label htmlFor="name">Full name</label>
                  <input id="name" name="name" type="text" autoComplete="name" className={invalid("name")} required />
                  {errors.name && <small className="field__error">{errors.name}</small>}
                </div>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" autoComplete="email" className={invalid("email")} required />
                  {errors.email && <small className="field__error">{errors.email}</small>}
                </div>

                <fieldset className={`field field--full ${invalid("attending")}`}>
                  <legend>Will you attend?</legend>
                  <div className="choice">
                    <label>
                      <input type="radio" name="attending" value="yes" onChange={() => setAttending("yes")} required />{" "}
                      Joyfully accept
                    </label>
                    <label>
                      <input type="radio" name="attending" value="no" onChange={() => setAttending("no")} /> Regretfully
                      decline
                    </label>
                  </div>
                  {errors.attending && <small className="field__error">{errors.attending}</small>}
                </fieldset>

                <div className="field attending-only">
                  <label htmlFor="guests">Number of guests</label>
                  <select id="guests" name="guests" defaultValue="1" className={invalid("guests")}>
                    {Array.from({ length: wedding.maxGuests }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field attending-only">
                  <label htmlFor="meal">Meal preference</label>
                  <select id="meal" name="meal" defaultValue="" className={invalid("meal")}>
                    <option value="">Select…</option>
                    {wedding.meals.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div className="field field--full">
                  <label htmlFor="message">
                    Message for the couple <span className="opt">(optional)</span>
                  </label>
                  <textarea id="message" name="message" rows={4} maxLength={1000} />
                </div>

                {/* Honeypot for bots — hidden from people and screen readers */}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />

                {formError && (
                  <p className="form__error" role="alert">
                    {formError}
                  </p>
                )}
                <button type="submit" className="btn btn--solid field--full" disabled={sending}>
                  {sending ? "Sending…" : "Send RSVP"}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      <section className="section wishes" id="wishes">
        <div className="container narrow">
          <Reveal>
            <SectionHead eyebrow="Love notes" title="Wishes" />
          </Reveal>
          <ul className="wishes__list">
            {wishes.map((w, i) => (
              <Reveal as="li" className="wish" key={`${w.name}-${i}`}>
                <p>“{w.message}”</p>
                <span>— {w.name}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
