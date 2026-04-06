import {
  NoplinCard,
  NoplinCardBodyArea,
  NoplinTable,
  NoplinTableHeader,
  NoplinTableHeaderCell,
  NoplinTableBody,
  NoplinTablePagination,
} from "noplin-uis";
import { HiOutlineTicket } from "react-icons/hi2";
import { NplEmpty } from "../ui";
import TicketRow from "./TicketRow";

const HEADERS = ["Title", "Status", "Priority", "Assignee", "Replies"];

export default function TicketTable({ tickets, totalCount }) {
  return (
    <NoplinCard style={{ padding: 0, overflow: "hidden" }}>
      <NoplinCardBodyArea>
        <NoplinTable>
          <NoplinTableHeader>
            {HEADERS.map((h) => (
              <NoplinTableHeaderCell key={h}>{h}</NoplinTableHeaderCell>
            ))}
          </NoplinTableHeader>

          <NoplinTableBody>
            {tickets.length === 0 ? (
              <tr>
                <td colSpan={HEADERS.length}>
                  <NplEmpty
                    icon={<HiOutlineTicket size={32} />}
                    title="No tickets found"
                    subtitle="Try adjusting your filters or search query"
                  />
                </td>
              </tr>
            ) : (
              tickets.map((t) => <TicketRow key={t.id} ticket={t} />)
            )}
          </NoplinTableBody>
        </NoplinTable>

        {tickets.length > 0 && <NoplinTablePagination />}
      </NoplinCardBodyArea>
    </NoplinCard>
  );
}
