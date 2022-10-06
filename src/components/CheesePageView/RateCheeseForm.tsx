import { reviewCheese } from '@/lib/reviewCheese';
import { getArrayOfNumbers } from '@/utils/getArrayOfNumbers';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

export const RateCheeseForm: React.FC<{ cheeseId: string }> = ({ cheeseId }) => {
  const { register, handleSubmit } = useForm<{ reviewer: string; rating: string; content: string }>();

  const rateCheeseMutation = useMutation((input: { rating: number; reviewer?: string; content?: string }) =>
    reviewCheese({ ...input, cheeseId: cheeseId })
  );

  const onSubmit = handleSubmit((data) => rateCheeseMutation.mutate({ ...data, rating: parseInt(data.rating) }));

  return (
    <div className="mt-4 flex w-full flex-col font-roboto">
      <p className=" bg-amber-300 px-4 py-1 text-lg ">Submit a review:</p>
      <form className="flex w-full flex-col gap-2 bg-stone-900 px-4 py-2 text-sm" onSubmit={onSubmit}>
        <div className="grid w-full grid-cols-2 gap-8">
          <div className="flex flex-col gap-1">
            <label className="text-gray-50">Your name</label>
            <input type="text" className=" bg-gray-50 p-2" {...register('reviewer')}></input>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-gray-50 ">Rating:</label>
            <select className="h-full bg-gray-50 p-2 " defaultValue={10} {...register('rating')}>
              {getArrayOfNumbers(2, 10).map((rating) => {
                return (
                  <option value={rating} key={'rating-select-' + rating}>
                    {rating / 2}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-gray-50">Review:</label>
          <textarea className="bg-gray-50 p-2" {...register('content')} />
        </div>

        <div className="my-1 flex items-end justify-end">
          <button
            className="transition-bg bg-amber-400 px-4 py-2  duration-100 hover:bg-amber-300 active:bg-amber-200 disabled:opacity-50"
            disabled={rateCheeseMutation.isLoading}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
