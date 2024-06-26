import "./Rating.scss";
import { LucideIcon, LucideProps, Star, StarHalf } from "lucide-react";
import { MouseEvent, useRef, useState } from "react";
type RatingProps = {
  value: number;
  spacing?: string;
  readonly?: boolean;
} & CustomStarPropsOptionalWithoutVariant;
function Rating({
  value,
  readonly = true,
  color = "#ffc30e",
  size = "16",
  spacing = "0.5rem",
}: RatingProps) {
  if (value > 5) throw Error("value can't greater than 5");
  if (value < 0) throw Error("value can't be less than 0");
  const [rate, setRate] = useState(value);
  const yourRatingRef = useRef<null | number>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const ratingValueWithoutFraction = Math.trunc(rate);
  const fractionPart = rate - ratingValueWithoutFraction;
  function handleRatingChange(
    e: MouseEvent<HTMLDivElement>,
    index: number
  ): void {
    if (!starRef.current) return;
    const starWidth = starRef.current.getBoundingClientRect().width;
    const rateValue =
      e.nativeEvent.offsetX >= starWidth / 2 ? index + 1 : index + 1 - 0.5;
    setRate(rateValue);
    if (e.type === "click") {
      yourRatingRef.current = rateValue;
    }
  }
  function handleRatingMouseLeave() {
    if (!yourRatingRef.current) {
      // you never rated
      setRate(value);
    } else {
      setRate(yourRatingRef.current);
    }
  }
  return (
    <div
      className="rating"
      style={{
        gap: spacing,
      }}
      onMouseLeave={() => (readonly ? undefined : handleRatingMouseLeave())}
    >
      {Array.from({ length: 5 }).map((_, index) => {
        return (
          <div
            ref={starRef}
            onMouseOver={(e) =>
              readonly ? undefined : handleRatingChange(e, index)
            }
            onClick={(e) =>
              readonly ? undefined : handleRatingChange(e, index)
            }
            key={index}
            style={{
              fontSize: 0,
              cursor: readonly ? "auto" : "pointer",
            }}
          >
            <CustomStar
              size={size}
              variant={`${
                ratingValueWithoutFraction > index
                  ? "filled"
                  : fractionPart >= 0.5 && index === ratingValueWithoutFraction
                  ? "half"
                  : "empty"
              }`}
              color={color}
            />
          </div>
        );
      })}
    </div>
  );
}
type CustomStarProps = {
  variant: "filled" | "half" | "empty";
  size?: LucideProps["size"];
  color: string;
};
type CustomStarPropsOptionalWithoutVariant = Omit<
  Partial<CustomStarProps>,
  "variant"
>;
type CustomStar = {
  [V in CustomStarProps["variant"]]: LucideIcon;
};
const customStar: CustomStar = {
  half: StarHalf,
  filled: Star,
  empty: Star,
};
function CustomStar({
  variant,
  color = "#ffc30e",
  size = "",
}: CustomStarProps) {
  const Star = customStar[variant];
  return (
    <Star
      className="icon"
      fill={variant === "empty" ? "transparent" : color}
      size={size}
      color={color}
    />
  );
}

export default Rating;
