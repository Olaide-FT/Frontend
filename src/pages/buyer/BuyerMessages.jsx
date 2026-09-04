import { useEffect, useState } from "react";
import {
  MessageSquare,
  MapPin,
} from "lucide-react";

import { getMySentInquiries } from "../../services/inquiryService";

function BuyerMessages() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const data = await getMySentInquiries();

        setInquiries(
          data?.inquiries ||
            data?.data ||
            data ||
            []
        );
      } catch (error) {
        console.error(
          "Failed to load inquiries:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  return (
    <section className="bg-background px-5 pb-24 pt-32 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Conversations
        </p>

        <h1 className="mt-2 font-heading text-4xl font-bold text-primary">
          Messages
        </h1>

        <p className="mt-2 font-body text-sm text-primary/45">
          Manage your property inquiries and conversations.
        </p>

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
              <div
                key={inquiry._id || inquiry.id}
                className="rounded-xl border border-primary/10 bg-white p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/5 text-primary">
                    <MessageSquare size={18} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap justify-between gap-3">
                      <h3 className="font-body font-semibold text-primary">
                        {inquiry.property?.title ||
                          inquiry.propertyTitle ||
                          "Property Inquiry"}
                      </h3>

                      <span className="rounded-full bg-primary/5 px-3 py-1 font-body text-[10px] font-semibold capitalize text-primary/50">
                        {inquiry.status || "pending"}
                      </span>
                    </div>

                    <p className="mt-1 flex items-center gap-1 font-body text-xs text-primary/40">
                      <MapPin size={12} />
                      {inquiry.property?.location ||
                        inquiry.location ||
                        "Property"}
                    </p>

                    <p className="mt-3 font-body text-sm leading-6 text-primary/55">
                      {inquiry.message ||
                        "No message available."}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-xl border border-primary/10 bg-white px-6 py-20 text-center">
            <MessageSquare
              size={28}
              className="mx-auto text-primary/25"
            />

            <h2 className="mt-4 font-heading text-2xl font-bold text-primary">
              No conversations yet
            </h2>

            <p className="mt-2 font-body text-sm text-primary/40">
              Your inquiries will appear here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export default BuyerMessages;