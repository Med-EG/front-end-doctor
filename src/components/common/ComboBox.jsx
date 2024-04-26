import React, { useState, useEffect } from "react";

function MyCombobox({ options = [], onChange, placeholder }) {
  const [selectedOption, setSelectedOption] = useState(""); // Initialize to empty string
  const [query, setQuery] = useState("");

  useEffect(() => {
    setQuery(selectedOption);
  }, [selectedOption]);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onChange(selectedValue); // Call the passed onChange function
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);
    if (!inputValue) {
      setSelectedOption(""); // Reset selected option when input is cleared
    }
    // setName only when input value is not selectedOption (removed)
    onChange(inputValue); // Call onChange with input value regardless (modified)
  };

  const handleInputBlur = () => {
    // Set selectedOption to the query when input is blurred
    setSelectedOption(query);
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex items-center h-16">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        className="w-full py-3 px-8 h-full rounded-s-lg border-1 border-blue-300"
        placeholder={placeholder}
      />
      <div className="relative w-1/2 h-full">
        <select
          className="w-full pl-8 h-full text-center rounded-e-lg border-x border-blue-300 peer text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2"
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option value=""></option> {/* Empty option */}
          {filteredOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <label className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 dark:peer-focus:text-neutral-500 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-gray-500 dark:peer-[:not(:placeholder-shown)]:text-neutral-500 dark:text-neutral-500">
          options
        </label>
      </div>
    </div>
  );
}

export default MyCombobox;
