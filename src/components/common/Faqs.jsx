import React, { useState } from 'react';
import jsonData from "../../DB/faq.json";

function Faqs() {
  // Define state to track expanded state of each FAQ item
  const [expandedItems, setExpandedItems] = useState({});

  // Function to toggle expanded state for a specific FAQ item
  const toggleItem = (index) => {
    setExpandedItems(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  return (
    <>
      {/* FAQ */}
      <div className="w-8/12  pt-20 pb-12   mx-auto">
        {/* Grid */}
        <div className="grid md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <div className="max-w-xs">
              <h2 className="text-2xl font-bold md:text-4xl md:leading-tight text-blue-500">
                Frequently
                <br />
                asked questions
              </h2>
              <p className="mt-1 hidden md:block text-gray-600">
                Answers to the most frequently asked questions.
              </p>
            </div>
          </div>

          <div className="md:col-span-3">
            {/* Accordion */}
            <div className="hs-accordion-group divide-y divide-gray-200">
              {jsonData.data && jsonData.data.map((item, index) => (
                <div
                  className="hs-accordion pb-3"
                  key={index}
                >
                  <button
                    className="hs-accordion-toggle group pb-3 inline-flex items-center primary-text-semibold secondary-color justify-between gap-x-3 w-full md:text-lg font-semibold text-start  rounded-lg transition hover:text-gray-500"
                    onClick={() => toggleItem(index)} // Toggle expanded state on click
                    aria-expanded={expandedItems[index]} // Set aria-expanded attribute
                  >
                    {item.question}
                    <svg
                      className={`hs-accordion-active:hidden block flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500 ${expandedItems[index] && 'hidden'}`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                    <svg
                      className={`hs-accordion-active:block hidden flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500 ${!expandedItems[index] && 'hidden'}`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m18 15-6-6-6 6" />
                    </svg>
                  </button>
                  <div
                    className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${!expandedItems[index] && 'hidden'}`}
                    aria-labelledby={`hs-basic-with-title-and-arrow-stretched-heading-${index}`}
                  >
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Faqs;
