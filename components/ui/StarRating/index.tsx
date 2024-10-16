import Icon from "@/components/ui/Icon";

export default function StarRating({ number = 0, className }: { number: number; className?: string }) {
  if (number > 5 || number < 0) return <></>;

  const rate = Math.round(number * 2) / 2;
  return (
    <div className={`flex gap-1 items-center c-accent11 ${className} `}>
      <StarIcons number={rate} />
    </div>
  );
}

function StarIcons({ number }: {number: number}) {
  return (
    <>
      {number >= 1 && <Icon name="bf-i-ph-star-fill"  />}
      {number >= 2 && <Icon name="bf-i-ph-star-fill"  />}
      {number >= 3 && <Icon name="bf-i-ph-star-fill"  />}
      {number >= 4 && <Icon name="bf-i-ph-star-fill"  />}
      {number === 5 && <Icon name="bf-i-ph-star-fill"  />}
      {number % 1 === 0.5 && <Icon name="bf-i-ph-star-half-fill"  />}
      {/* empty stars */}
      {number <= 4 && <Icon name="bf-i-ph-star"  />}
      {number <= 3 && <Icon name="bf-i-ph-star"  />}
      {number <= 2 && <Icon name="bf-i-ph-star"  />}
      {number <= 1 && <Icon name="bf-i-ph-star"  />}
      {number === 0 && <Icon name="bf-i-ph-star"  />}
    </>
  );
}
