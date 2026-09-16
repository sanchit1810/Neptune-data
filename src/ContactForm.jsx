import { useRef, useState } from "react";

const topics = [
  ["customer-service", "Voice & conversation data"],
  ["healthcare", "Healthcare data"],
  ["data-partnership", "Data partnership"],
  ["other", "Something else"],
];

export default function ContactForm({ kind }) {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const attempt = useRef(null);
  const confirmation = useRef(null);
  const initialTopic =
    kind === "voice"
      ? "customer-service"
      : kind === "clinical"
        ? "healthcare"
        : "";

  async function submit(event) {
    event.preventDefault();
    if (status === "sending") return;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    const fingerprint = JSON.stringify(values);
    if (attempt.current?.fingerprint !== fingerprint) {
      attempt.current = { fingerprint, id: crypto.randomUUID() };
    }
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          id: attempt.current.id,
          source: window.location.pathname,
        }),
        signal: AbortSignal.timeout(15000),
      });
      const result = await response
        .json()
        .catch(() => ({
          error: "We couldn’t save your enquiry. Please try again.",
        }));
      if (!response.ok || result.status !== "received") {
        throw new Error(
          result.error || "We couldn’t save your enquiry. Please try again.",
        );
      }
      setStatus("success");
      requestAnimationFrame(() => confirmation.current?.focus());
    } catch (failure) {
      setStatus("error");
      setError(
        failure.name === "TimeoutError"
          ? "The connection timed out. Please try again; your enquiry will not be duplicated."
          : failure.message === "Failed to fetch"
            ? "We couldn’t connect. Check your connection and try again."
            : failure.message || "Something went wrong. Please try again.",
      );
    }
  }

  if (status === "success")
    return (
      <div
        className="form-success"
        ref={confirmation}
        tabIndex={-1}
        role="status"
      >
        <span className="eyebrow">Enquiry received</span>
        <h3>Thank you for getting in touch.</h3>
        <p>
          Your enquiry has been saved. We’ll use the email address you provided
          to continue the conversation.
        </p>
        <button
          type="button"
          className="text-link"
          onClick={() => {
            setStatus("idle");
            attempt.current = null;
          }}
        >
          Send another enquiry <span aria-hidden="true">↗</span>
        </button>
      </div>
    );

  return (
    <form
      className="contact-form"
      onSubmit={submit}
      aria-label="Start a conversation"
      aria-busy={status === "sending"}
    >
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="enquiry-name">Name</label>
          <input
            id="enquiry-name"
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={120}
            placeholder="Your name"
            disabled={status === "sending"}
          />
        </div>
        <div className="form-field">
          <label htmlFor="enquiry-email">Work email</label>
          <input
            id="enquiry-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            placeholder="you@company.com"
            disabled={status === "sending"}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="enquiry-organisation">Organisation</label>
          <input
            id="enquiry-organisation"
            name="organisation"
            autoComplete="organization"
            required
            minLength={2}
            maxLength={160}
            placeholder="Company or institution"
            disabled={status === "sending"}
          />
        </div>
        <div className="form-field">
          <label htmlFor="enquiry-topic">I’m interested in</label>
          <select
            id="enquiry-topic"
            name="topic"
            defaultValue={initialTopic}
            required
            disabled={status === "sending"}
          >
            <option value="" disabled>
              Select an enquiry type
            </option>
            {topics.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="enquiry-message">What would you like to discuss?</label>
        <textarea
          id="enquiry-message"
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          placeholder="Describe the data you need or the records your organisation holds."
          aria-describedby="enquiry-note"
          disabled={status === "sending"}
        />
      </div>
      <div className="form-trap" aria-hidden="true">
        <label htmlFor="enquiry-website">Leave this field empty</label>
        <input
          id="enquiry-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <p id="enquiry-note" className="form-note">
        We use these details to respond to your enquiry. Please don’t include
        patient records or personal customer data.
      </p>
      {error && (
        <p className="form-error" role="alert">
          {error} You can also email{" "}
          <a href="mailto:sanchit@neptunedata.ai">sanchit@neptunedata.ai</a>.
        </p>
      )}
      <button
        className="form-submit"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending enquiry…" : "Send enquiry"}{" "}
        <span aria-hidden="true">↗</span>
      </button>
      <noscript>
        <p>
          To use this form, enable JavaScript. You can also email
          sanchit@neptunedata.ai.
        </p>
      </noscript>
    </form>
  );
}
