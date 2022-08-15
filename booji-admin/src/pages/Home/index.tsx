import { useAddProject, useDelProject, useProjectList } from "@/hooks/project";
import { ProjectData } from "@/types";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import AddProject from "./AddProject";
import DelProject from "./DelProject";
import ProjectList from "./ProjectList";

const Home = () => {
  const { t } = useTranslation();
  const { value, loading, setPage, retry } = useProjectList();

  const { visible, onOpen, onClose } = useAddProject();
  const {
    visible: visibleDel,
    onOpen: onOpenDel,
    onClose: onCloseDel,
  } = useDelProject();

  const [curProject, setCurProject] = useState<ProjectData>();

  const onDelete = (project: ProjectData) => {
    setCurProject(project);
    onOpenDel();
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h2>{t("projectList")}</h2>
        <Button icon={<PlusOutlined />} className="mb-4" onClick={onOpen}>
          {t("addProject")}
        </Button>
      </div>
      <ProjectList
        value={value}
        loading={loading}
        onDelete={onDelete}
        onChange={setPage}
        onUpdate={retry}
      />
      <AddProject visible={visible} onClose={onClose} onSuccess={retry} />
      {curProject && (
        <DelProject
          project={curProject}
          visible={visibleDel}
          onClose={onCloseDel}
          onSuccess={retry}
        />
      )}
    </>
  );
};

export default Home;
