import { addProject, delProject, getProjectList } from "@/api";
import { AddProjectForm } from "@/types";
import { FormInstance } from "antd";
import { useState } from "react";
import { useAsyncRetry } from "react-use";

export const useProjectList = () => {
  return useAsyncRetry(async () => {
    return await getProjectList();
  });
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
  const onDelete = async (appKey: string) => {
    setLoading(true);
    await delProject(appKey);
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
