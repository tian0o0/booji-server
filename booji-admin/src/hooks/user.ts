import { delUser, getUserList } from "@/api";
import { UserData } from "@/types";
import { useEffect, useState } from "react";
import { useAsyncRetry } from "react-use";

export const useUserList = (perPage: number = 10) => {
  // const [loading, setLoading] = useState(false);
  // const [value, setValue] = useState<UserData[]>([]);

  // useEffect(() => {
  //   setLoading(true);
  //   getUserList()
  //     .then((res) => {
  //       setValue(res);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  // const options = value.map((item) => ({
  //   label: item.name,
  //   value: item.id,
  // }));

  // return {
  //   loading,
  //   value,
  //   options,
  // };
  const [page, setPage] = useState(1);

  const res = useAsyncRetry(async () => {
    return await getUserList({ page, perPage });
  }, [page, perPage]);

  const options = res.value?.data.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  return {
    ...res,
    options,
    page,
    setPage,
  };
};

export const useDelUser = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const onOpen = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const onDelete = async (userId: number) => {
    setLoading(true);
    await delUser(userId);
    setLoading(false);
  };
  return {
    onOpen,
    onClose,
    onDelete,
    visible,
    loading,
  };
};
