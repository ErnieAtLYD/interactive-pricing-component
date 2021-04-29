import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import "./Slider.scss";

// https://dev.to/munkacsimark/styled-range-input-a-way-out-of-range-input-nightmare-jeo

const Slider = ({
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 0,
  onChange = () => {},
}) => {
  const inputRef = useRef();
  const [isChanging, setIsChanging] = useState(false);

  const getPercent = useMemo(
    () => (value) => ((value - min) / (max - min)) * 100,
    [max, min]
  );

  const changeInputProgressPercentStyle = useCallback(() => {
    inputRef.current.style.setProperty(
      "--webkitProgressPercent",
      `${getPercent(inputRef.current.value)}%`
    );
  }, [getPercent]);

  useEffect(() => {
    changeInputProgressPercentStyle();
    const inputElement = inputRef.current;
    const handleUpAndLeave = () => setIsChanging(false);
    const handleDown = () => setIsChanging(true);

    inputElement.addEventListener("mousemove", changeInputProgressPercentStyle);
    inputElement.addEventListener("mousedown", handleDown);
    inputElement.addEventListener("mouseup", handleUpAndLeave);
    inputElement.addEventListener("mouseleave", handleUpAndLeave);
    return () => {
      inputElement.removeEventListener(
        "mousemove",
        changeInputProgressPercentStyle
      );
      inputElement.removeEventListener("mousedown", handleDown);
      inputElement.removeEventListener("mouseup", handleUpAndLeave);
      inputElement.removeEventListener("mouseleave", handleUpAndLeave);
    };
  }, [isChanging, changeInputProgressPercentStyle]);

  useEffect(() => {
    if (!inputRef?.current) return;
    changeInputProgressPercentStyle();
  }, [inputRef, changeInputProgressPercentStyle]);

  return (
    <>
      <input
        ref={inputRef}
        type="range"
        className="pricing-component__slider"
        min={min}
        max={max}
        step={step}
        value={defaultValue}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </>
  );
};

export default Slider;
