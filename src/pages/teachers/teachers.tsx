import { useGet } from "@/hooks/useGet";
import { useUserContext } from "@/contexts/userProvider";
import { Routes, Route } from "react-router-dom";
// UI imports
import { Header } from "@/components/app/Header";
import { Footer } from "@/components/app/footer";
import { Loader } from "@/components/students/Loader";
// import { SubjectActivities } from "./subjectActivities";
import { Lobby } from "./lobby";
import { TeacherSubjectActivities } from "./activities";
import { SubjectProvider } from "@/contexts/subjectProvider";
import { ActivityProvider } from "@/contexts/activityProvider";
import { CreateActivities } from "./createActivity";
import { UpdateActivity } from "./updateActivity";
import { useActivityContext } from "@/contexts/activityProvider";
// import { ActivitySolved } from "./activitySolve";

export const Teacher = () => {
  const { user } = useUserContext();
  const { activity } = useActivityContext();
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
          <Header isStudent={false} />
          <div className="mt-20 mb-14 container h-full grid grid-cols-3 flex-1">
            <SubjectProvider>
              <ActivityProvider>
                <Routes>
                  <Route path="/" element={<Lobby teacherData={teacherData} subjectData={subjectData} />} />
                  <Route path=":subject" element={<TeacherSubjectActivities />} />
                  <Route path=":subject/create-activity" element={<CreateActivities />} />
                  <Route path=":subject/update-activity" element={<UpdateActivity activity={activity} />} />
                  {/* <Route path=":subject/:activity" element={<ActivitySolved />} /> */}
                </Routes>
              </ActivityProvider>
            </SubjectProvider>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};
