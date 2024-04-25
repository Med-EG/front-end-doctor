function Pagination({ currentPage, pagesLinks, pages, totalPages, nextPage, prevPage }) {
    return (
        <>

            {/* <!-- Pagination --> */}
            <nav className="flex items-center gap-x-1">
                <button type="button" className="min-h-[46px] min-w-[46px] py-4 px-4 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10" onClick={() => pages(prevPage)} disabled={prevPage==null} > 
                    <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m15 18-6-6 6-6"></path>
                    </svg>
                    <span aria-hidden="true" className="sr-only">Previous</span>
                </button>
                <div className="flex items-center gap-x-1">
                    <span className="min-h-[46px] min-h-[46px] min-w-[46px] flex justify-center items-center border border-gray-200 text-gray-800 py-3 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:border-gray-700 dark:text-white dark:focus:bg-gray-800">{currentPage}</span>
                    <span className="min-h-[46px] flex justify-center items-center text-gray-500 py-3 px-1.5 text-sm dark:text-gray-500">of</span>
                    <span className="min-h-[46px] flex justify-center items-center text-gray-500 py-3 px-1.5 text-sm dark:text-gray-500">{totalPages}</span>
                </div>
                <button type="button" className="min-h-[46px] min-w-[46px] py-4 px-4 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10" onClick={() =>pages(nextPage)} disabled={nextPage==null}>
                    <span aria-hidden="true" className="sr-only">Next</span>
                    <svg className="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6"></path>
                    </svg>
                </button>
            </nav>

            {/* <nav className="flex items-center gap-x-1">
                {pagesLinks && pagesLinks.map((item, index) => (
                    <button type="button" className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex  justify-center items-center gap-x-2 text-sm rounded-lg border-2 border-blue-400 text-blue-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none" key={index} onClick={() => pages(item.url)} >
                        {item.label}
                    </button>
                ))}
            </nav> */}
            {/* <!-- End Pagination --> */}

        </>);
}

export default Pagination;