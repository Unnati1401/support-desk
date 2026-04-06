import { Timeline, TimelineCard, NoplinCard, NoplinCardBodyArea } from "noplin-uis";
import { HiOutlinePlusCircle, HiOutlineChatBubbleLeft, HiOutlineArrowPath, HiOutlineUser } from "react-icons/hi2";
import { fmtDate } from "../../utils/helpers";

const HISTORY_ICONS = {
  created:  <HiOutlinePlusCircle size={14} style={{ verticalAlign: "middle" }} />,
  reply:    <HiOutlineChatBubbleLeft size={14} style={{ verticalAlign: "middle" }} />,
  status:   <HiOutlineArrowPath size={14} style={{ verticalAlign: "middle" }} />,
  assigned: <HiOutlineUser size={14} style={{ verticalAlign: "middle" }} />,
};

export default function ActivityTimeline({ history }) {
  return (
    <NoplinCard>
      <NoplinCardBodyArea>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "#929eaa",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          marginBottom: 14,
        }}
      >
        Activity Timeline
      </div>
      <Timeline>
        {history.map((event, i) => (
          <TimelineCard
            key={i}
            title={{
              content: (
                <>
                  <span style={{ marginRight: 5 }}>{HISTORY_ICONS[event.type] ?? "•"}</span>
                  {event.detail}
                </>
              ),
            }}
            content={{
              content: `${event.by} · ${fmtDate(event.at)}`,
            }}
          />
        ))}
      </Timeline>
      </NoplinCardBodyArea>
    </NoplinCard>
  );
}
