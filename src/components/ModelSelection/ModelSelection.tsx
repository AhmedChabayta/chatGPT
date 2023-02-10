"use client";

import useSwr from "swr";
import Select from "react-select";

const fetchModels = () => fetch("/api/getEngines").then((res) => res.json());

const ModelSelection = () => {
  const { data: models, isLoading } = useSwr("models", fetchModels);
  const { data: model, mutate: setModel } = useSwr("model", {
    fallbackData: "text-davinci-003",
  });

  return (
    <div>
      <Select
        className="my-4 mx-auto mt-2 w-[95%] text-gray-900"
        options={models?.modelOptions}
        defaultValue={model}
        isSearchable
        isLoading={isLoading}
        menuPosition="fixed"
        classNames={{
          control: (state) => "bg-gray-500 border-gray-500 text-gray-200",
        }}
        placeholder={model}
        onChange={(e) => setModel(e.value)}
      />
    </div>
  );
};
export default ModelSelection;
