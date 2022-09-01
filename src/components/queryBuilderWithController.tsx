import { useMachine } from '@xstate/react';
import { useEffect } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { ImBin } from 'react-icons/im';
import { filterMachine } from '../config/filterMachine';
import { InputProps, Operators, Options } from '../config/types';
import { Select } from './Select';

export const QueryBuilderWithController = () => {
  const [state, send] = useMachine(filterMachine);

  useEffect(() => {
    send('START');
  });

  const { control, handleSubmit } = useForm<ConversationFilter>({
    defaultValues: {
      filter: [
        {
          filterOptions: { value: 'status', label: 'Status' },
          operatorOptions: { value: '_eq', label: 'equal (=)' },
          valueOptions: { value: [0, 1, 2], label: 'all' },
        },
      ],
    },
    mode: 'onBlur',
  });

  // const filterOptionsArray = watch("filter");

  const { fields, append, remove } = useFieldArray({
    name: 'filter',
    control,
  });

  const onSubmit = (data: ConversationFilter) => {
    // console.log(data);
    send({ type: 'SUBMIT' });
  };

  return (
    <div className='mx-auto my-9 p-5 w-2/3 rounded-lg bg-slate-100'>
      <div className='flex justify-between items-center'>
        <h3 className='text-third text-xl'>Create Filter</h3>
        <div>
          <span className='cursor-pointer float-right rounded-3xl hover:bg-sky-100 p-3 text-gray-500'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </span>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((item, index) => {
          return (
            <div className='divide-y divide-primary' key={item.id}>
              <div className='flex justify-between items-center gap-3 mt-3 bg-slate-200 mr-5 mb-8 bg-secondary p-3 rounded-md'>
                <Select
                  operators={state.context.options}
                  send={(msg) => {
                    send({
                      type: 'SELECT_OPTION',
                      value: msg as Options,
                    });
                  }}
                />
                <Select
                  operators={state.context.operators}
                  send={(msg) => {
                    send({
                      type: 'CHANGE_OPERATOR',
                      value: msg as Operators,
                    });
                  }}
                />
                <Select
                  operators={state.context.values}
                  send={(msg) => {
                    send({
                      type: 'CHANGE_VALUE',
                      value: msg as InputProps['value'],
                    });
                  }}
                />

                <button
                  onClick={() => remove(index)}
                  className=' flex justify-center items-center -mr-7 w-8 h-8 bg-[#D44F68] shadow-layout shadow-[#D44F68]/70 rounded-full'
                >
                  <ImBin className='text-md text-white' />
                </button>
              </div>
            </div>
          );
        })}

        <div className='flex justify-end gap-3 mt-5'>
          <button
            onClick={() =>
              append({
                filterOptions: { value: 'status', label: 'Status' },
                operatorOptions: { value: '_eq', label: 'equal (=)' },
                valueOptions: { value: '', label: '' },
              })
            }
            className='px-4 py-2 bg-sky-500 text-white rounded-md'
          >
            Add Filter
          </button>
          <button
            type='submit'
            className='text-primary bg-green-500 px-4 py-2 text-white rounded-md'
          >
            Search
          </button>
        </div>
      </form>
      <div className='mt-10 border-2 rounded-md p-2 border-yellow-800'>
        {JSON.stringify(state.context.results)}
      </div>
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
