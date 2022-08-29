import { useState, useEffect, useMemo } from "react";
import { useAsyncRetry } from "react-use";
import { getArchiveList, getSourceMapList } from "@/api/sourcemap";

export const useArchiveSelect = (appKey: string) => {
  const [selectedArchive, setSelectedArchive] = useState<string>("");

  const { value } = useAsyncRetry(async () => {
    return await getArchiveList(appKey);
  }, [appKey]);

  const options =
    value?.map((item) => ({
      label: item,
      value: item,
    })) || [];

  useEffect(() => {
    const defaultArchive = (value && value[0]) || "";
    setSelectedArchive(defaultArchive);
  }, [value]);

  const onChange = (archive: string) => {
    setSelectedArchive(archive);
  };

  return {
    options,
    selectedArchive,
    onChange,
  };
};

export const useSourceMapList = (appKey: string, release: string) => {
  const { loading, value } = useAsyncRetry(async () => {
    if (!release) return;
    return await getSourceMapList({ appKey, release });
  }, [appKey, release]);

  return {
    loading,
    value,
  };
};
