function SectionHeading({
    eyebrow,
    title,
    description,
    centered = false,
}) {
    return (
        <div
            className={`max-w-2xl ${centered ? "mx-auto text-center" : ""
                }`}
        >
            {eyebrow && (
                <p className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                    {eyebrow}
                </p>
            )}

            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-primary sm:text-4xl lg:text-5xl">
                {title}
            </h2>

            {description && (
                <p className="mt-5 font-body text-base leading-7 text-primary/60">
                    {description}
                </p>
            )}
        </div>
    );
}

export default SectionHeading;