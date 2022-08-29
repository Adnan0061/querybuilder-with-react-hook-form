import { Controller, useFieldArray, useForm } from "react-hook-form";
import { ImBin } from "react-icons/im";
import Select from "react-select";

const filterOptionsList = [
  { value: "status", label: "Status" },
  { value: "agent_id", label: "Assignee Name" },
  { value: "inbox_id", label: "Inbox Name" },
  { value: "team_id", label: "Team Name" },
  // { value: "identifier", label: "Identifier" },
  // { value: "city", label: "City" },
  // { value: "country", label: "Country" },
  // { value: "CRM_link", label: "CRM Link" },
  // { value: "customer_segment", label: "Customer Segment" },
  // { value: "contact_reason", label: "Contact Reason" },
];
const operatorOptionsList = (filter: string) => {
  if (filter === "status")
    return [
      { value: "_eq", label: "equal (=)" },
      { value: "_neq", label: "not equal (!=)" },
    ];
  if (filter === "agent_id" || filter === "inbox_id" || filter === "team_id")
    return [
      { value: "_eq", label: "equal (=)" },
      { value: "_neq", label: "not equal (!=)" },
      { value: "_ilike", label: "is present" },
      { value: "_nilike", label: "is not present" },
      // { value: "_similar", label: "begins with (case sensitive)" },
      // { value: "_nsimilar", label: "not begins with (case sensitive)" },
    ];
};
const statusOptionsList = [
  { value: [0, 1, 2], label: "all" },
  { value: [0], label: "open" },
  { value: [1], label: "closed" },
  { value: [2], label: "snoozed" },
];
const assigneeOptionsList = [
  { value: "assignee_1", label: "Assignee 1" },
  { value: "assignee_2", label: "Assignee 2" },
  { value: "assignee_3", label: "Assignee 3" },
  { value: "assignee_4", label: "Assignee 4" },
];
const inboxOptionsList = [
  { value: "inbox_1", label: "Inbox 1" },
  { value: "inbox_2", label: "Inbox 2" },
  { value: "inbox_3", label: "Inbox 3" },
  { value: "inbox_4", label: "Inbox 4" },
];
const teamOptionsList = [
  { value: "team_1", label: "Team 1" },
  { value: "team_2", label: "Team 2" },
  { value: "team_3", label: "Team 3" },
  { value: "team_4", label: "Team 4" },
];

const QueryBuilderWithoutController = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ConversationFilter>({
    defaultValues: {
      filter: [
        {
          filterOptions: { value: "status", label: "Status" },
          operatorOptions: { value: "_eq", label: "equal (=)" },
          valueOptions: { value: [0, 1, 2], label: "all" },
        },
      ],
    },
    mode: "onBlur",
  });

  const filterOptionsArray = watch("filter");

  const { fields, append, remove } = useFieldArray({
    name: "filter",
    control,
  });

  const onSubmit = (data: ConversationFilter) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <div className="mx-auto my-9 p-5 w-2/3 rounded-lg bg-slate-100">
      <div className="flex justify-between items-center">
        <h3 className="text-third text-xl">Create Filter</h3>
        <div>
          <span className="cursor-pointer float-right rounded-3xl hover:bg-sky-100 p-3 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        {fields.map((item, index) => {
          // console.log(item);
          return (
            <div className="divide-y divide-primary" key={item.id}>
              <div className="flex justify-between items-center gap-3 mt-3 bg-slate-200 mr-5 mb-8 bg-secondary p-3 rounded-md">
                <Controller
                  name={`filter.${index}.filterOptions`}
                  control={control}
                  render={({ field }) => {
                    return <Select className="w-[26%]" {...field} options={filterOptionsList} />;
                  }}
                />

                <Controller
                  name={`filter.${index}.operatorOptions`}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Select
                        className="w-[26%]"
                        {...field}
                        options={
                          filterOptionsArray[index].filterOptions.value === "status"
                            ? operatorOptionsList("status")
                            : filterOptionsArray[index].filterOptions.value === "agent_id"
                            ? operatorOptionsList("agent_id")
                            : filterOptionsArray[index].filterOptions.value === "inbox_id"
                            ? operatorOptionsList("inbox_id")
                            : filterOptionsArray[index].filterOptions.value === "team_id"
                            ? operatorOptionsList("team_id")
                            : [{ value: "null", label: "null" }]
                        }
                      />
                    );
                  }}
                />

                <Controller
                  name={`filter.${index}.valueOptions`}
                  control={control}
                  render={({ field }) => {
                    return (
                      <Select
                        className="w-[40%]"
                        {...field}
                        options={
                          filterOptionsArray[index].filterOptions.value === "status"
                            ? statusOptionsList
                            : filterOptionsArray[index].filterOptions.value === "agent_id"
                            ? assigneeOptionsList
                            : filterOptionsArray[index].filterOptions.value === "inbox_id"
                            ? inboxOptionsList
                            : filterOptionsArray[index].filterOptions.value === "team_id"
                            ? teamOptionsList
                            : [{ value: "null", label: "null" }]
                        }
                      />
                    );
                  }}
                />

                <button onClick={() => remove(index)} className=" flex justify-center items-center -mr-7 w-8 h-8 bg-[#D44F68] shadow-layout shadow-[#D44F68]/70 rounded-full">
                  <ImBin className="text-md text-white" />
                </button>
              </div>
            </div>
          );
        })}

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={() =>
              append({
                filterOptions: { value: "status", label: "Status" },
                operatorOptions: { value: "_eq", label: "equal (=)" },
                valueOptions: { value: "", label: "" },
              })
            }
            className="px-4 py-2 bg-sky-500 text-white rounded-md"
          >
            Add Filter
          </button>
          <button type="submit" className="text-primary bg-green-500 px-4 py-2 text-white rounded-md">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};
export default QueryBuilderWithoutController;

export interface ConversationFilter {
  filter: ConversationFilterObj[];
}
export interface ConversationFilterObj {
  filterOptions: { value: string; label: string };
  operatorOptions: { value: string; label: string };
  valueOptions: { value: string | number | number[]; label: string };
}
