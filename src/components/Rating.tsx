import { useId } from 'react';

export const Rating: React.FC<{ rating: number; size?: string }> = ({ rating, size }) => {
  const ratingId = useId();
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="flex gap-1">
      {stars.map((star) => {
        const starRatingIdx = star * 2;
        return (
          <div
            key={'rating-star-' + star + '-' + ratingId}
            className={`relative rounded-full ${
              starRatingIdx > rating ? 'bg-slate-400 bg-opacity-40' : ' bg-amber-400'
            }`}
            style={{
              height: size ?? '8px',
              width: size ?? '8px'
            }}
          >
            {rating === starRatingIdx - 1 && (
              <div
                className="absolute top-0 left-0 z-20 rounded-full"
                style={{
                  background: 'linear-gradient(90deg, rgba(251,191,36) 50%, rgba(23,115,196,0) 50%)',
                  height: size ?? '8px',
                  width: size ?? '8px'
                }}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};
