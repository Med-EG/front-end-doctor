import { useContext, useEffect, useState } from "react";
import { DoctorsContext } from "@/context/DoctorsProvider";
import { getDoctorByID } from "@/services/homeServices";
import Card from "../common/Card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function SimilarDoctors({ id }) {
  const { doctors, loading } = useContext(DoctorsContext);
  const [targetSpecialization, setTargetSpecialization] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  // Combined error handling and data extraction
  useEffect(() => {
    getDoctorByID(id)
      .then((res) => {
        if (res?.data?.doctor) {
          setTargetSpecialization(res.data.doctor.specialization);
        } else {
          console.error("Error fetching doctor data:", res);
        }
      })
      .catch((err) => {
        console.error("Error getting doctor by ID:", err);
      });
  }, [id]);

  // Filter doctors and handle empty list scenario
  useEffect(() => {
    const filteredDoctors = doctors.filter(
      (doctor) => doctor?.specialization === targetSpecialization
    );
    setFilteredDoctors(filteredDoctors);
    // Reset currentPage only if filteredDoctors has elements (avoid infinite loop)
    if (filteredDoctors.length !== 0) {
      setCurrentPage(0);
    }
  }, [targetSpecialization, doctors]);

  const totalPages = Math.ceil(filteredDoctors.length / 3) || 0; // Handle empty list

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  return (
    <div className="container lg:py-20">
      <div className="fs-half w-full gradient-background mb-6"></div>
      <h4 className="primary-text-bold gradient-text text-xl pb-10">
        Similar Doctors :
      </h4>
      {loading ? (
        <p>Loading Doctors...</p>
      ) : (
        <Carousel>
          <CarouselContent>

            {filteredDoctors.length > 0 ? (
              // Render carousel only if doctors exist
              <>
              <div className="w-full flex items-center justify-around">
                {
                  filteredDoctors
                    .slice(currentPage * 1, (currentPage + 1) * 4) // Adjust slice for 3 doctors
                    .map((doctor, index) => (
                      <Card
                        key={index}
                        src={`https://api-medeg.online/${doctor.doctor_image}`}
                        DoctorName={`${doctor.first_name} ${doctor.last_name}`}
                        specialization={doctor.specialization}
                        location={doctor.city}
                      />
                    ))
                }
                </div></>
            )
              :
              (
                <p>No similar doctors found.</p>
              )}
          </CarouselContent>
          <CarouselPrevious onClick={handlePreviousPage} disabled={currentPage === 0} />
          <CarouselNext onClick={handleNextPage} disabled={currentPage === totalPages - 1} />
        </Carousel>
      )}
    </div>
  );
}

export default SimilarDoctors;
