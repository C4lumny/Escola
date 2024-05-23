import { createContext, useContext, useState, ReactNode } from "react";

interface SubjectContextData {
  subject: any;
  createSubject: (user: any) => void;
}

const SubjectContext = createContext<SubjectContextData>({
  subject: {},
  createSubject: () => {},
});

export const useSubjectContext = () => {
  return useContext(SubjectContext);
};

interface SubjectProviderProps {
  children: ReactNode;
}

export const SubjectProvider = ({ children }: SubjectProviderProps) => {
  const [subject, setSubject] = useState<any>();

  const createSubject = (newSubject: any) => {
    setSubject(newSubject);
  };

  return <SubjectContext.Provider value={{ subject, createSubject }}>{children}</SubjectContext.Provider>;
};
