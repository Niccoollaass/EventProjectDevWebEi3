import "./Event.scss"

type EventCardProps = {
  title: string;
};

export default function EventCard({ title }: EventCardProps) {
  return (
    <div className="event-card">
      {title}
    </div>
  );
}