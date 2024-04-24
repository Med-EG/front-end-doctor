import React, { Component } from 'react';
import Card from "../common/Card";

import Pagination from "../common/pagination";


function AllDoctors({ doctor, setpages }) {

    return (
        <>
            <div className="flex flex-wrap justify-center items-center gap-10">
                {doctor.data && doctor.data.map((doc, index) => (
                    <Card key={index}
                        src={`https://api-medeg.online/${doc.doctor_image}`}
                        DoctorName={`${doc.first_name} ${doc.last_name}`}
                        specialization={doc.specialization}
                        location={doc.city}
                        doctorID={doc.doctor_id}
                    />
                ))}

            </div>
            <div className="flex justify-center py-12">
                <Pagination
                    currentPage={doctor.current_page}
                    totalPages={doctor.last_page}
                    nextPage={doctor.next_page_url}
                    prevPage={doctor.prev_page_url}
                    pagesLinks={doctor.links}
                    pages={setpages}
                ></Pagination>

                
            </div>


        </>
    );
}

export default AllDoctors;