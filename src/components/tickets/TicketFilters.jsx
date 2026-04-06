import { GeneralSearch, DropDown } from "noplin-uis";
import { useAppContext } from "../../context/AppContext";
import { TEAMS, STATUSES, PRIORITIES } from "../../data/constants";
import { capitalize, toDropDownList } from "../../utils/helpers";

export default function TicketFilters({ showTeamFilter = true }) {
  const { state, dispatch } = useAppContext();
  const { filters, search } = state;

  const setFilter = (key, value) =>
    dispatch({ type: "SET_FILTER", payload: { [key]: value } });

  const setSearch = (value) =>
    dispatch({ type: "SET_SEARCH", payload: value });

  const statusOptions = [
    { value: "all", label: "All statuses" },
    ...STATUSES.map((s) => ({ value: s, label: capitalize(s) })),
  ];

  const priorityOptions = [
    { value: "all", label: "All priorities" },
    ...PRIORITIES.map((p) => ({ value: p, label: capitalize(p) })),
  ];

  const teamOptions = [
    { value: "all", label: "All teams" },
    ...TEAMS.map((t) => ({ value: t, label: t })),
  ];

  const sortOptions = [
    { value: "newest",   label: "Newest first" },
    { value: "oldest",   label: "Oldest first" },
    { value: "priority", label: "By priority" },
    { value: "updated",  label: "Last updated" },
  ];

  return (
    <div className="de-flex gap-10" style={{ flexWrap: "wrap", alignItems: "flex-end" }}>
      {/* Search */}
      <div style={{ flex: "1 1 180px", minWidth: 180 }}>
        <GeneralSearch
          placeholder="Search tickets..."
          value={search}
          onTyping={(value) => setSearch(value)}
          onComplete={(value) => setSearch(value)}
          icon={{ icon: null, className: "" }}
          close={{ icon: null, className: "" }}
          input={{ className: "" }}
        />
      </div>

      <div style={{ minWidth: 140 }}>
        <DropDown
          isMouseInsideParentRow={true}
          list={toDropDownList(statusOptions, (v) => setFilter("status", v))}
          button={{ icon: { icon: null, class: "" }, text: { text: statusOptions.find((o) => o.value === filters.status)?.label || "All statuses", class: "_npl-mbnm-btn-txt" } }}
          buttonClasses="_npl-mbnm-btn"
          enableLoading={{ enable: false, duration: 0 }}
          dropDownsearch={false}
          debug={false}
          breakpoints={[{ ratio: 1200, fullWidth: false }, { ratio: 780, fullWidth: false }, { ratio: 480, fullWidth: true }]}
        />
      </div>

      <div style={{ minWidth: 140 }}>
        <DropDown
          isMouseInsideParentRow={true}
          list={toDropDownList(priorityOptions, (v) => setFilter("priority", v))}
          button={{ icon: { icon: null, class: "" }, text: { text: priorityOptions.find((o) => o.value === filters.priority)?.label || "All priorities", class: "_npl-mbnm-btn-txt" } }}
          buttonClasses="_npl-mbnm-btn"
          enableLoading={{ enable: false, duration: 0 }}
          dropDownsearch={false}
          debug={false}
          breakpoints={[{ ratio: 1200, fullWidth: false }, { ratio: 780, fullWidth: false }, { ratio: 480, fullWidth: true }]}
        />
      </div>

      {showTeamFilter && (
        <div style={{ minWidth: 130 }}>
          <DropDown
            isMouseInsideParentRow={true}
            list={toDropDownList(teamOptions, (v) => setFilter("team", v))}
            button={{ icon: { icon: null, class: "" }, text: { text: teamOptions.find((o) => o.value === filters.team)?.label || "All teams", class: "_npl-mbnm-btn-txt" } }}
            buttonClasses="_npl-mbnm-btn"
            enableLoading={{ enable: false, duration: 0 }}
            dropDownsearch={false}
            debug={false}
            breakpoints={[{ ratio: 1200, fullWidth: false }, { ratio: 780, fullWidth: false }, { ratio: 480, fullWidth: true }]}
          />
        </div>
      )}

      <div style={{ minWidth: 140 }}>
        <DropDown
          isMouseInsideParentRow={true}
          list={toDropDownList(sortOptions, (v) => setFilter("sort", v))}
          button={{ icon: { icon: null, class: "" }, text: { text: sortOptions.find((o) => o.value === filters.sort)?.label || "Newest first", class: "_npl-mbnm-btn-txt" } }}
          buttonClasses="_npl-mbnm-btn"
          enableLoading={{ enable: false, duration: 0 }}
          dropDownsearch={false}
          debug={false}
          breakpoints={[{ ratio: 1200, fullWidth: false }, { ratio: 780, fullWidth: false }, { ratio: 480, fullWidth: true }]}
        />
      </div>
    </div>
  );
}
