import SectionHeading from "../../components/common/SectionHeading";

function About() {
    return (
        <section className="bg-background px-5 pb-24 pt-32 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-7xl">
                <SectionHeading
                    eyebrow="About Nestora"
                    title="Making property discovery feel simpler."
                    description="Nestora brings buyers, property owners and trusted listings together in one modern platform."
                />

                <div className="mt-14 grid gap-10 lg:grid-cols-2">
                    <img
                        src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=85"
                        alt="Elegant property interior"
                        className="h-[500px] w-full rounded-xl object-cover"
                    />

                    <div className="flex flex-col justify-center">
                        <h2 className="font-heading text-3xl font-bold text-primary">
                            Built around people, not listings.
                        </h2>

                        <p className="mt-5 font-body leading-8 text-primary/60">
                            Finding property should feel exciting, not overwhelming.
                            Nestora is designed to make the journey from
                            discovery to connection simple and transparent.
                        </p>

                        <p className="mt-5 font-body leading-8 text-primary/60">
                            Whether you're looking for your first home, your next
                            investment or the right people to rent or sell your
                            property to, we're building a better way to connect.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;