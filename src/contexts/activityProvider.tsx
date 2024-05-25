import { createContext, useContext, useState, ReactNode } from "react";

interface ActivityContextData {
  activity: any;
  createActivity: (user: any) => void;
}

const ActivityContext = createContext<ActivityContextData>({
  activity: {},
  createActivity: () => {},
});

export const useActivityContext = () => {
  return useContext(ActivityContext);
};

interface ActivityProviderProps {
  children: ReactNode;
}

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
  const [activity, setActivity] = useState<any>();

  const createActivity = (newActivity: any) => {
    setActivity(newActivity);
  };

  return <ActivityContext.Provider value={{ activity, createActivity }}>{children}</ActivityContext.Provider>;
};
