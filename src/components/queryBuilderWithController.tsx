import { useFieldArray, useForm } from "react-hook-form";
import { ImBin } from "react-icons/im";
import Select from "react-select";
import { useMachine } from "@xstate/react";
import { useEffect } from "react";
import { filterMachine } from "../config/filterMachine";
import { InputProps, Operators, Options } from "../config/types";

export const QueryBuilderWithController = () => {
  const [state, send] = useMachine(filterMachine);

  useEffect(() => {
    send("START");
    // console.log(state.value);
    // console.log(state.context.filterType);
  });

  // console.log(state.value, state.value.filter_selected);
  // console.log(state.context.option, state.context.operatorType, state.context.value);

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

  // const filterOptionsArray = watch("filter");

  const { fields, append, remove } = useFieldArray({
    name: "filter",
    control,
  });

  const onSubmit = (data: ConversationFilter) => {
    console.log(data);
    // const options = data.filter[0].filterOptions.value;
    // const value = data.filter[0].valueOptions.value;
    // const filterQuery: {
    //   status?: number[];
    //   assignee?: string;
    //   team?: string;
    //   inbox?: string;
    // } = {
    //   status: options === "status" ? (value as number[]) : undefined,
    //   assignee: options === "agent_id" ? (value as string) : undefined,
    //   inbox: options === "inbox_id" ? (value as string) : undefined,
    //   team: options === "team_id" ? (value as string) : undefined,
    // };
    send({ type: "SUBMIT" });
  };
  console.log(state.value);

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
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((item, index) => {
          // console.log(item);
          return (
            <div className="divide-y divide-primary" key={item.id}>
              <div className="flex justify-between items-center gap-3 mt-3 bg-slate-200 mr-5 mb-8 bg-secondary p-3 rounded-md">
                {/* <Controller
                  name={`filter.${index}.filterOptions`}
                  control={control}
                  render={({ field }) => {
                    return <Select className="w-[26%]" {...field} options={filterOptionsList} />;
                  }}
                /> */}

                <Select className="w-[26%]" onChange={(e) => send({ type: "SELECT_OPTION", value: e?.value as Options })} options={state.context.options} />

                {/* <Controller
                  name={`filter.${index}.operatorOptions`}
                  control={control}
                  render={({ field }) => {
                    return ( */}
                <Select
                  className="w-[26%]"
                  // {...field}
                  // defaultValue={() => {
                  //   const a = operatorOptionsList("status");
                  //   return a[0];
                  // }}
                  onChange={(e) => state.context.option && send({ type: "CHANGE_OPERATOR", value: e?.value as Operators })}
                  options={
                    state.context.operators
                    //state.context.operators
                  }
                />
                {/* );
                  }}
                /> */}

                {/* <Controller
                  name={`filter.${index}.valueOptions`}
                  control={control}
                  render={({ field }) => {
                    return ( */}
                <Select
                  className="w-[40%]"
                  // {...field}
                  onChange={(e) => send({ type: "CHANGE_VALUE", value: e?.value as InputProps["value"] })}
                  options={state.context.values}
                />
                {/* );
                  }}
                /> */}

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
      <form>
        <select name="" id=""></select>
      </form>
      <div>{JSON.stringify(state.context.results)}</div>
    </div>
  );
};

export interface ConversationFilter {
  filter: ConversationFilterObj[];
}
export interface ConversationFilterObj {
  filterOptions: { value: string; label: string };
  operatorOptions: { value: string; label: string };
  valueOptions: { value: string | number | number[]; label: string };
}