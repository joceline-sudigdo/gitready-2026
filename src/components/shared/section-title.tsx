interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  onDark?: boolean; // true when placed on a dark navy background
  titleColor?: string; // override title color (any CSS color)
  subtitleColor?: string; // override subtitle color (any CSS color)
}

export function SectionTitle({
  title,
  subtitle,
  align = "left",
  onDark = false,
  titleColor,
  subtitleColor,
}: SectionTitleProps) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <h2
        className="font-heading text-2xl font-bold uppercase tracking-wider sm:text-3xl"
        style={{ color: titleColor ?? (onDark ? "#4DC8F5" : "#4DC8F5") }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="mt-2 text-sm sm:text-base"
          style={{
            color: subtitleColor ?? (onDark ? "#CBD5E1" : "#5B7BA8"),
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
