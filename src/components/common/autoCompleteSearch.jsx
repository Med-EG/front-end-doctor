import React from 'react';

function AutoCompleteSearch(props) {
    return (
        <>
            <div className="relative" data-hs-combo-box='{
                "apiUrl": "https://freetestapi.com/api/v1/countries",
                "outputItemTemplate": "<div className=\"cursor-pointer py-2 px-4 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-gray-200 dark:focus:bg-slate-800\" data-hs-combo-box-output-item><div className=\"flex justify-between items-center w-full\"><div><div data-hs-combo-box-output-item-field=\"name\" data-hs-combo-box-search-text data-hs-combo-box-value></div></div><span className=\"hidden hs-combo-box-selected:block\"><svg className=\"flex-shrink-0 size-3.5 text-blue-600 dark:text-blue-500\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" strokeWidth=\"2\" strokeLinecap=\"round\" strokeLinejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"></polyline></svg></span></div></div>"
            }'>
                <div className="relative">
                    <input className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" type="text"  data-hs-combo-box-input=""/>
                    <div className="absolute top-1/2 end-3 -translate-y-1/2" data-hs-combo-box-toggle="">
                        <svg className="flex-shrink-0 size-3.5 text-gray-500 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m7 15 5 5 5-5"></path>
                            <path d="m7 9 5-5 5 5"></path>
                        </svg>
                    </div>
                </div>
                <div className="absolute z-50 w-full max-h-72 p-1 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-gray-700 dark:[&::-webkit-scrollbar-thumb]:bg-gray-500 dark:bg-slate-900 dark:border-gray-700" style={{display: "none"}} data-hs-combo-box-output=""></div>
            </div>
        </>
    );
}

export default AutoCompleteSearch;
