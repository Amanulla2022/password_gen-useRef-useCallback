import React, { useCallback, useRef } from "react";

const CheckboxWithLabel = ({ id, checked, onChange, label }) => {
  const textColorClass = checked ? "text-green-500" : "text-red-500";

  // Ref for input element
  const inputRef = useRef(null);

  // useCallback for onChange function
  const handleChange = useCallback(() => {
    if (onChange) {
      onChange(!checked);
    }
  }, [onChange, checked]);

  return (
    <div className="flex items-center mb-2">
      <input
        ref={inputRef}
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handleChange}
        className="mr-2"
      />
      <label htmlFor={id} className={textColorClass}>
        {checked ? `Include ${label} ` : `Exclude ${label}`}
      </label>
    </div>
  );
};

export default CheckboxWithLabel;
