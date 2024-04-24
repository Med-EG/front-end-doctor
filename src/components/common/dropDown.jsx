function DropDown({DefaultValue, OnChange , options , Label}) {
    return (
        <>

            <div className="relative w-full">
                <select className="peer p-4 pe-9 block w-full border-blue-300 border-2 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 focus:pt-6 focus:pb-2 [&:not(:placeholder-shown)]:pt-6 [&:not(:placeholder-shown)]:pb-2 autofill:pt-6 autofill:pb-2" defaultValue={DefaultValue} onChange={OnChange}>
                    <option >{null}</option>
                    {options}
                </select>
                <label className="absolute border-blue-300 gradient-text  text-lg top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:-translate-y-1.5 peer-[:not(:placeholder-shown)]:gradient-text">{Label}</label>
            </div>

        </>
    );
}

export default DropDown;