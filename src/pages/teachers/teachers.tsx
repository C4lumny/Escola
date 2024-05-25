import { useGet } from "@/hooks/useGet";
import { useUserContext } from "@/contexts/userProvider";
import { Routes, Route } from "react-router-dom";
// UI imports
import { Header } from "@/components/app/Header";
import { Footer } from "@/components/app/footer";
import { Loader } from "@/components/students/Loader";
// import { SubjectActivities } from "./subjectActivities";
import { Lobby } from "./lobby";
// import { SubjectProvider } from "@/contexts/subjectProvider";
// import { ActivitySolved } from "./activitySolve";

export const Teacher = () => {
  const { user } = useUserContext();
  const { data: teacherData, loading: teacherLoading } = useGet(`teachers/${user?.identificacion}`);
  const { data: subjectData, loading: subjectLoading } = useGet(`subjects/teachers/${user?.identificacion}`);  
  return (
    <>
      {teacherLoading && subjectLoading ? (
        <div className="h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col min-h-screen w-full">
          <Header />
          <div className="mt-20 mb-14 container h-full grid grid-cols-3 flex-1">
              <Routes>
                <Route
                  path="/"
                  element={
                    <Lobby teacherData={teacherData} subjectData={subjectData} />
                  }
                />
                {/* <Route path=":subject" element={<SubjectActivities />} />
                <Route path=":subject/:activity" element={<ActivitySolved />} /> */}
              </Routes>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};
