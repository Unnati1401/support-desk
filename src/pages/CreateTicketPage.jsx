import { useState } from "react";
import { LightButton, NoplinCard, NoplinCardBodyArea, TextField, TextAreaField, DropDown } from "noplin-uis";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { useAppContext } from "../context/AppContext";
import { NplDivider } from "../components/ui";
import { CATEGORIES, TEAMS, PRIORITIES } from "../data/constants";
import { capitalize, toDropDownList } from "../utils/helpers";

const INITIAL_FORM = {
  title:       "",
  description: "",
  category:    CATEGORIES[0],
  priority:    "medium",
  assignedTeam: "",
};

export default function CreateTicketPage() {
  const { dispatch } = useAppContext();
  const [form, setForm] = useState(INITIAL_FORM);

  const setField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const isValid = form.title.trim() && form.description.trim();

  const handleSubmit = () => {
    if (!isValid) return;
    dispatch({ type: "CREATE_TICKET", payload: form });
  };

  const priorityOptions = PRIORITIES.map((p) => ({ value: p, label: capitalize(p) }));
  const categoryOptions = CATEGORIES.map((c) => ({ value: c, label: c }));
  const teamOptions = [
    { value: "", label: "Let system decide" },
    ...TEAMS.map((t) => ({ value: t, label: t })),
  ];

  return (
    <div style={{ padding: 24, maxWidth: 640, margin: "0 auto" }}>
      {/* Header */}
      <div className="de-flex gap-10" style={{ alignItems: "center", marginBottom: 24 }}>
        <LightButton onClick={() => dispatch({ type: "SET_VIEW", payload: "dashboard" })}>
          <HiOutlineArrowLeft size={14} style={{ marginRight: 5, verticalAlign: "middle" }} />Back
        </LightButton>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>Create New Ticket</h2>
      </div>

      <NoplinCard>
        <NoplinCardBodyArea>
          {/* Title */}
          <div className="__npl-form-gfld-a">
            <label className="__npl-material-input-lbl-vp __cma32">Title *</label>
            <TextField
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
              placeholder="Brief description of the issue…"
            />
          </div>

          {/* Description */}
          <div className="__npl-form-gfld-a">
            <label className="__npl-material-input-lbl-vp __cma32">Description *</label>
            <TextAreaField
              value={form.description}
              onChange={(e) => setField("description", e.target.value)}
              placeholder="Steps to reproduce, expected behavior, screenshots…"
              rows={6}
            />
          </div>

          {/* Category + Priority */}
          <div className="npl-row">
            <div className="npl-col-6 npl-col-mb-12">
              <div className="__npl-form-gfld-a">
                <label className="__npl-material-input-lbl-vp __cma32">Category</label>
                <DropDown
                  isMouseInsideParentRow={true}
                  list={toDropDownList(categoryOptions, (v) => setField("category", v))}
                  button={{ icon: { icon: null, class: "" }, text: { text: categoryOptions.find((o) => o.value === form.category)?.label || "Select...", class: "_npl-mbnm-btn-txt" } }}
                  buttonClasses="_npl-mbnm-btn"
                  enableLoading={{ enable: false, duration: 0 }}
                  dropDownsearch={false}
                  debug={false}
                  breakpoints={[{ ratio: 1200, fullWidth: false }, { ratio: 780, fullWidth: false }, { ratio: 480, fullWidth: true }]}
                />
              </div>
            </div>
            <div className="npl-col-6 npl-col-mb-12">
              <div className="__npl-form-gfld-a">
                <label className="__npl-material-input-lbl-vp __cma32">Priority</label>
                <DropDown
                  isMouseInsideParentRow={true}
                  list={toDropDownList(priorityOptions, (v) => setField("priority", v))}
                  button={{ icon: { icon: null, class: "" }, text: { text: priorityOptions.find((o) => o.value === form.priority)?.label || "Select...", class: "_npl-mbnm-btn-txt" } }}
                  buttonClasses="_npl-mbnm-btn"
                  enableLoading={{ enable: false, duration: 0 }}
                  dropDownsearch={false}
                  debug={false}
                  breakpoints={[{ ratio: 1200, fullWidth: false }, { ratio: 780, fullWidth: false }, { ratio: 480, fullWidth: true }]}
                />
              </div>
            </div>
          </div>

          {/* Team */}
          <div className="__npl-form-gfld-a">
            <label className="__npl-material-input-lbl-vp __cma32">Team (optional)</label>
            <DropDown
              isMouseInsideParentRow={true}
              list={toDropDownList(teamOptions, (v) => setField("assignedTeam", v))}
              button={{ icon: { icon: null, class: "" }, text: { text: teamOptions.find((o) => o.value === form.assignedTeam)?.label || "Let system decide", class: "_npl-mbnm-btn-txt" } }}
              buttonClasses="_npl-mbnm-btn"
              enableLoading={{ enable: false, duration: 0 }}
              dropDownsearch={false}
              debug={false}
              breakpoints={[{ ratio: 1200, fullWidth: false }, { ratio: 780, fullWidth: false }, { ratio: 480, fullWidth: true }]}
            />
          </div>

          <NplDivider />

          {/* Actions */}
          <div className="de-flex" style={{ justifyContent: "space-between" }}>
            <LightButton onClick={() => dispatch({ type: "SET_VIEW", payload: "dashboard" })}>
              Cancel
            </LightButton>
            <LightButton
              onClick={handleSubmit}
              disabled={!isValid}
              style={{
                background: "#053d79ff",
                color: "#fff",
                ...(!isValid ? { opacity: 0.5, pointerEvents: "none" } : {}),
              }}
            >
              Submit Ticket
            </LightButton>
          </div>
        </NoplinCardBodyArea>
      </NoplinCard>
    </div>
  );
}
