import type { FC } from 'react';
import type { InputProps } from '../config/types';

type Props = {
  operators: InputProps[] | string[];
  send: (value: unknown) => void;
};

export const Select: FC<Props> = ({ operators, send }) => {
  return (
    <select
      className='w-[26%] rounded-md px-4 py-2'
      onChange={(e) => send(e.currentTarget.value)}
    >
      {operators.map((data, key) => {
        if (typeof data === 'string') {
          return (
            <option
              key={key}
              label={data}
              className='py-1.5'
              value={data}
            />
          );
        }
        const { label, value } = data;
        return (
          <option
            key={key}
            label={label}
            className='py-1.5'
            value={value.toLocaleString()}
          />
        );
      })}
    </select>
  );
};
