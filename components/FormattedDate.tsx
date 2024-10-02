export interface FormattedDateProps {
  date: Date;
}

export default function FormattedDate({ date }: FormattedDateProps) {
  return (
    date instanceof Date && (
      <time dateTime={date.toISOString()}>
        {date.toLocaleDateString(undefined, { month: "long", day: "2-digit", year: "numeric" })}
      </time>
    )
  );
}
