import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import SectionHeading from "../../components/common/SectionHeading";

const CONTACT_EMAIL = "hello@nestora.com";

const initialForm = { name: "", email: "", subject: "", message: "" };

function Contact() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const { name, email, subject, message } = form;

    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setError("Please fill in all fields before sending.");
      return;
    }

    // Opens the user's mail client pre-filled with the form data.
    // Replace this with an API call once a /contact backend endpoint is added.
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${body}`;

    window.location.href = mailtoUrl;
    setSubmitted(true);
    setForm(initialForm);
  };

  return (
    <section className="bg-background px-5 pb-24 pt-32 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Contact Us"
          title="Let's talk about property."
          description="Have a question, need help finding a property or want to list one? We'd love to hear from you."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          <div className="space-y-7">
            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary text-accent">
                <MapPin size={19} />
              </div>

              <div>
                <h3 className="font-body font-semibold text-primary">
                  Our Office
                </h3>

                <p className="mt-1 font-body text-sm text-primary/50">
                  Lagos, Nigeria
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary text-accent">
                <Mail size={19} />
              </div>

              <div>
                <h3 className="font-body font-semibold text-primary">
                  Email
                </h3>

                <p className="mt-1 font-body text-sm text-primary/50">
                  {CONTACT_EMAIL}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary text-accent">
                <Phone size={19} />
              </div>

              <div>
                <h3 className="font-body font-semibold text-primary">
                  Phone
                </h3>

                <p className="mt-1 font-body text-sm text-primary/50">
                  +234 800 000 0000
                </p>
              </div>
            </div>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center justify-center rounded-xl bg-white p-8 shadow-sm text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600">
                <Mail size={24} />
              </div>

              <h3 className="mt-4 font-heading text-2xl font-bold text-primary">
                Message sent!
              </h3>

              <p className="mt-2 font-body text-sm text-primary/50">
                Your mail client should have opened. If not, email us directly
                at{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-accent underline"
                >
                  {CONTACT_EMAIL}
                </a>
                .
              </p>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-6 rounded-lg border border-primary/10 px-5 py-2.5 font-body text-sm font-semibold text-primary"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-xl bg-white p-6 shadow-sm sm:p-8"
            >
              {error && (
                <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 font-body text-sm text-red-600">
                  {error}
                </p>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className="rounded-lg border border-primary/10 px-4 py-3 font-body text-sm outline-none focus:border-accent"
                />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  required
                  className="rounded-lg border border-primary/10 px-4 py-3 font-body text-sm outline-none focus:border-accent"
                />
              </div>

              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
                className="mt-5 w-full rounded-lg border border-primary/10 px-4 py-3 font-body text-sm outline-none focus:border-accent"
              />

              <textarea
                rows="6"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="How can we help?"
                required
                className="mt-5 w-full resize-none rounded-lg border border-primary/10 px-4 py-3 font-body text-sm outline-none focus:border-accent"
              />

              <button
                type="submit"
                className="mt-5 rounded-lg bg-primary px-6 py-3.5 font-body text-sm font-semibold text-white"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default Contact;
