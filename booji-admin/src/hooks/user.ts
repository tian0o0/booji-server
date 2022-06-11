import { getUserList } from "@/api";
import { UserData } from "@/types";
import { useEffect, useState } from "react";

export const useUserList = () => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<UserData[]>([]);

  useEffect(() => {
    setLoading(true);
    getUserList()
      .then((res) => {
        setValue(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const options = value.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  return {
    loading,
    value,
    options,
  };
};
