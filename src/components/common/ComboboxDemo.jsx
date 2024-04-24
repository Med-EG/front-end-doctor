// ComboboxDemo.jsx
import React, { useEffect, useState } from "react";
import { Combobox } from "@headlessui/react"; // Make sure you have Headless UI installed

function ComboboxDemo({ medicines, onChange, name, selectedValue }) {
  const [query, setQuery] = useState("");
  const [filteredMedicines, setFilteredMedicines] = useState([]);

  useEffect(() => {
    if (medicines && medicines.length > 0) {
      setFilteredMedicines(medicines.map((medicine) => medicine.medicine_name)); // Extract medicine names
    }
  }, [medicines]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value.toLowerCase();
    setQuery(inputValue);
    if (medicines && medicines.length > 0) {
      const filtered = medicines.filter((medicine) =>
        medicine?.medication_name.toLowerCase().includes(inputValue)
      );
      setFilteredMedicines(
        filtered.map((medicine) => medicine.medication_name)
      ); // Extract medicine names for filtering
    }
  };

  const handleSelectionChange = () => {
    // Call the provided onChange handler prop with the selected medicine name
    onChange({
      target: {
        name: name,
        value: selectedValue,
      },
    });
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <Combobox>
        <Combobox.Input
          className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          onChange={handleInputChange}
          placeholder="Search for a medicine..."
          name={name}
          value={selectedValue}
        />
        <Combobox.Options className="mt-1 w-full py-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-56 overflow-auto focus:outline-none">
          {filteredMedicines.map((medicineName, index) => (
            <Combobox.Option
              key={index}
              value={medicineName} // Set value to medicine name
              className={({ active }) =>
                `${
                  active ? "text-white bg-blue-500" : "text-gray-900"
                } cursor-default select-none relative py-2 px-4`
              }
              onClick={() => handleSelectionChange(medicineName)}
            >
              {medicineName}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}

export default ComboboxDemo;
