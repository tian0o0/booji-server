import { addProject, delProject, getProjectList } from "@/api";
import { AddProjectForm } from "@/types";
import { FormInstance } from "antd";
import { useState } from "react";
import { useAsyncRetry } from "react-use";

export const useProjectList = (perPage: number = 10) => {
  const [page, setPage] = useState(1);

  const res = useAsyncRetry(async () => {
    return await getProjectList(page, perPage);
  }, [page, perPage]);

  return {
    ...res,
    page,
    setPage,
  };
};

export const useDelProject = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const onOpen = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const onDelete = async (id: number) => {
    setLoading(true);
    await delProject(id);
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

export const useAddProject = (form?: FormInstance<AddProjectForm>) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const onOpen = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  const onAdd = async () => {
    await form!.validateFields();
    setLoading(true);
    await addProject(form!.getFieldsValue());
    setLoading(false);
    form!.resetFields();
  };

  return {
    onOpen,
    onClose,
    onAdd,
    visible,
    loading,
  };
};
