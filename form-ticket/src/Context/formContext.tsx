import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type FormValues = {
  full_name: string;
  github_name: string;
  email: string;
  avatar_url: string | null;
};

type FormContext = {
  userValues: FormValues;
  clearValues: () => void;
  updateValues: (data: Partial<FormValues>) => void;
};

const defaultValues: FormValues = {
  full_name: "",
  email: "",
  github_name: "",
  avatar_url: null,
};

const UserFormContext = createContext({} as FormContext);

export function useForm() {
  return useContext(UserFormContext);
}

export function FormProvider({ children }: { children: ReactNode }) {
  const [userValues, setUserValues] = useState<FormValues>(defaultValues);

  function clearValues() {
    if (userValues.avatar_url) {
      URL.revokeObjectURL(userValues.avatar_url);
    }
    setUserValues(defaultValues);
  }

  function updateValues(data: Partial<FormValues>) {
    setUserValues((prev) => ({ ...prev, ...data }));
  }

  return (
    <>
      <UserFormContext.Provider
        value={{ clearValues, userValues, updateValues }}
      >
        {children}
      </UserFormContext.Provider>
    </>
  );
}
