import { useGet } from "@/hooks/useGet";
import { useUserContext } from "@/contexts/userProvider";
import { Routes, Route } from "react-router-dom";
// UI imports
import { Header } from "@/components/students/Header";
import { Footer } from "@/components/footer";
import { Loader } from "@/components/students/Loader";
import { SubjectActivities } from "./subjectActivities";
import { Lobby } from "./lobby";

export const Student = () => {
  const { user } = useUserContext();
  const { data: studentData, loading: studentLoading } = useGet(`students/${user?.identificacion}`);
  const { data: subjectData, loading: subjectLoading } = useGet(`subjects/${user?.identificacion}`);
  const { data: activitiesData, loading: activitiesLoading } = useGet(`activities/${user?.identificacion}`);
  return (
    <>
      {studentLoading && subjectLoading && activitiesLoading ? (
        <div className="h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="mt-20 mb-14 container h-full grid grid-cols-3 flex-1">
            <Routes>
              <Route
                path="/"
                element={<Lobby activitiesData={activitiesData} studentData={studentData} subjectData={subjectData} />}
              />
              <Route path=":subject" element={<SubjectActivities activities={activitiesData.data} />} />
            </Routes>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};
