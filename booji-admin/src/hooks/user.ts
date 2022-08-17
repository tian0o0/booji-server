import { delUser, getUserList, loginGithub } from "@/api";
import { useState } from "react";
import { useAsyncRetry } from "react-use";
import { setToken } from "@/utils/token";
import { useSetRecoilState } from "recoil";
import { userState } from "@/store";
import { useNavigate } from "react-router-dom";

export const useUserList = (perPage: number = 10) => {
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

export const useLoginGithub = () => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  const login = async (code: string) => {
    const res = await loginGithub(code);
    if (!res.error) {
      setUser(res);
      setToken(res.token);
      navigate("/");
    }
  };

  return {
    login,
  };
};
