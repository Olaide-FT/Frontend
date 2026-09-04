import { useEffect, useState } from "react";
import {
  MessageSquare,
  MapPin,
  CalendarDays,
} from "lucide-react";

import {
  closeInquiry,
  getMyInquiries,
  respondToInquiry,
} from "../../services/inquiryService";

const formatInquiryDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;

  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

function OwnerInquiries() {
  const [inquiries, setInquiries] =
    useState([]);

  const [loading, setLoading] =
    useState(true);
  const [responses, setResponses] = useState({});
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const data =
          await getMyInquiries();

        setInquiries(
          data?.inquiries ||
            data?.data ||
            data ||
            []
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  const replaceInquiry = (updatedInquiry) => {
    setInquiries((current) => current.map((inquiry) => (
      (inquiry._id || inquiry.id) === (updatedInquiry._id || updatedInquiry.id)
        ? updatedInquiry
        : inquiry
    )));
  };

  const handleRespond = async (inquiryId) => {
    const response = responses[inquiryId]?.trim();
    if (!response) {
      setError("Enter a response before sending it.");
      return;
    }

    try {
      setBusyId(inquiryId);
      setError("");
      const data = await respondToInquiry(inquiryId, response);
      replaceInquiry(data.inquiry);
      setResponses((current) => ({ ...current, [inquiryId]: "" }));
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to send response.");
    } finally {
      setBusyId(null);
    }
  };

  const handleClose = async (inquiryId) => {
    try {
      setBusyId(inquiryId);
      setError("");
      const data = await closeInquiry(inquiryId);
      replaceInquiry(data.inquiry);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to close inquiry.");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <section className="px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Buyer Interest
        </p>

        <h1 className="mt-2 font-heading text-4xl font-bold text-primary">
          Property Inquiries
        </h1>

        <p className="mt-2 font-body text-sm text-primary/45">
          See who is interested in your properties.
        </p>

        {error && (
          <div className="mt-6 rounded-lg bg-red-50 px-4 py-3 font-body text-sm text-red-600">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-8 space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-28 animate-pulse rounded-xl bg-white"
              />
            ))}
          </div>
        ) : inquiries.length ? (
          <div className="mt-8 space-y-4">
            {inquiries.map((inquiry) => (
              <article
                key={inquiry._id || inquiry.id}
                className="rounded-xl border border-primary/10 bg-white p-6"
              >
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary">
                    <MessageSquare size={18} />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-body font-semibold text-primary">
                          {inquiry.property?.title ||
                            inquiry.propertyTitle ||
                            "Property Inquiry"}
                        </h3>

                        <p className="mt-1 flex items-center gap-1 font-body text-xs text-primary/40">
                          <MapPin size={12} />
                          {inquiry.property?.location ||
                            inquiry.location ||
                            "Property"}
                        </p>
                      </div>

                      <span className="rounded-full bg-amber-50 px-3 py-1 font-body text-[10px] font-semibold capitalize text-amber-700">
                        {inquiry.status || "pending"}
                      </span>
                    </div>

                    <p className="mt-4 font-body text-sm leading-6 text-primary/55">
                      {inquiry.message ||
                        "No message available."}
                    </p>

                    {formatInquiryDate(inquiry.createdAt) && (
                      <p className="mt-3 flex items-center gap-1.5 font-body text-xs text-primary/40">
                        <CalendarDays size={13} />
                        Sent {formatInquiryDate(inquiry.createdAt)}
                      </p>
                    )}

                    {inquiry.buyer && (
                      <p className="mt-4 font-body text-xs text-primary/40">
                        From:{" "}
                        <span className="font-semibold text-primary/70">
                          {inquiry.buyer.firstName}{" "}
                          {inquiry.buyer.lastName}
                        </span>
                      </p>
                    )}

                    {inquiry.response && (
                      <div className="mt-4 rounded-lg bg-primary/5 px-4 py-3 font-body text-sm text-primary/65">
                        <span className="font-semibold text-primary">Your response: </span>
                        {inquiry.response}
                      </div>
                    )}

                    {inquiry.status !== "closed" && (
                      <div className="mt-4 space-y-3 border-t border-primary/10 pt-4">
                        {!inquiry.response && (
                          <>
                            <textarea
                              value={responses[inquiry._id || inquiry.id] || ""}
                              onChange={(event) => setResponses((current) => ({
                                ...current,
                                [inquiry._id || inquiry.id]: event.target.value,
                              }))}
                              maxLength={1000}
                              rows={3}
                              placeholder="Write a response to this buyer..."
                              className="w-full resize-none rounded-lg border border-primary/10 px-3 py-2 font-body text-sm outline-none focus:border-accent"
                            />
                            <button
                              type="button"
                              disabled={busyId === (inquiry._id || inquiry.id)}
                              onClick={() => handleRespond(inquiry._id || inquiry.id)}
                              className="rounded-lg bg-primary px-4 py-2 font-body text-xs font-semibold text-white disabled:opacity-60"
                            >
                              Send Response
                            </button>
                          </>
                        )}

                        <button
                          type="button"
                          disabled={busyId === (inquiry._id || inquiry.id)}
                          onClick={() => handleClose(inquiry._id || inquiry.id)}
                          className="ml-2 rounded-lg border border-primary/10 px-4 py-2 font-body text-xs font-semibold text-primary disabled:opacity-60"
                        >
                          Close Inquiry
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-xl border border-primary/10 bg-white px-6 py-20 text-center">
            <MessageSquare
              size={30}
              className="mx-auto text-primary/20"
            />

            <h2 className="mt-4 font-heading text-2xl font-bold text-primary">
              No inquiries yet
            </h2>

            <p className="mt-2 font-body text-sm text-primary/40">
              Buyer inquiries about your properties will appear here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default OwnerInquiries;
