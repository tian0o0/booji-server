import FullScreenSpin from "@/components/FullScreenSpin";
import { useProjectSelect } from "@/hooks/issue";
import ProjectSelect from "../Issue/ProjectSelect";

const Performance = () => {
  const { options, selectedAppKey, loading, onChange } = useProjectSelect();
  const onProjectSelect = (appKey: string) => {
    onChange(appKey);
  };
  return (
    <>
      {loading ? (
        <FullScreenSpin />
      ) : (
        selectedAppKey && (
          <div>
            <ProjectSelect
              options={options}
              selectedAppKey={selectedAppKey}
              onChange={onProjectSelect}
            />
          </div>
        )
      )}
    </>
  );
};

export default Performance;
