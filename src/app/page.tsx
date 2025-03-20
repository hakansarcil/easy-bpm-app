"use client";

import { useState } from "react";
import { Modal } from "@/components/Modal";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Listbox } from "@headlessui/react";

const INPUT_TYPES = [
  {
    id: "text",
    name: "Text Input",
    properties: ["label", "placeholder", "required", "minLength", "maxLength"],
  },
  {
    id: "numeric",
    name: "Numeric Input",
    properties: ["label", "placeholder", "required", "min", "max", "step"],
  },
  {
    id: "datetime",
    name: "Date/Time Input",
    properties: ["label", "required", "format", "minDate", "maxDate"],
  },
  {
    id: "checkbox",
    name: "Checkbox",
    properties: ["label", "required", "defaultChecked"],
  },
  {
    id: "radio",
    name: "Radio Button",
    properties: ["label", "required", "options"],
  },
  {
    id: "dropdown",
    name: "Dropdown",
    properties: ["label", "required", "options", "multiple"],
  },
  {
    id: "popup",
    name: "Popup",
    properties: ["label", "triggerText", "content"],
  },
] as const;

type InputProperty = {
  name: string;
  value: string;
};

type WizardStep = "select-type" | "configure-properties" | "preview";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(INPUT_TYPES[0]);
  const [currentStep, setCurrentStep] = useState<WizardStep>("select-type");
  const [properties, setProperties] = useState<InputProperty[]>([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setCurrentStep("select-type");
    setProperties([]);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentStep("select-type");
    setProperties([]);
  };

  const handleNext = () => {
    if (currentStep === "select-type") {
      // Initialize properties based on selected type
      const initialProperties = selectedType.properties.map((prop) => ({
        name: prop,
        value: "",
      }));
      setProperties(initialProperties);
      setCurrentStep("configure-properties");
    } else if (currentStep === "configure-properties") {
      setCurrentStep("preview");
    }
  };

  const handleBack = () => {
    if (currentStep === "configure-properties") {
      setCurrentStep("select-type");
    } else if (currentStep === "preview") {
      setCurrentStep("configure-properties");
    }
  };

  const handlePropertyChange = (propertyName: string, value: string) => {
    setProperties((prev) =>
      prev.map((prop) =>
        prop.name === propertyName ? { ...prop, value } : prop
      )
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "select-type":
        return (
          <div className="mt-4">
            <Listbox value={selectedType} onChange={setSelectedType}>
              <div className="relative">
                <Listbox.Button
                  className={cn(
                    "relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border",
                    "focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2",
                    "focus-visible:ring-white/75 focus-visible:ring-offset-2",
                    "focus-visible:ring-offset-blue-300 sm:text-sm"
                  )}
                >
                  <span className="block truncate">{selectedType.name}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Listbox.Options
                  className={cn(
                    "absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1",
                    "text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm",
                    "z-[100]"
                  )}
                >
                  {INPUT_TYPES.map((type) => (
                    <Listbox.Option
                      key={type.id}
                      value={type}
                      className={({ active }) =>
                        cn(
                          "relative cursor-default select-none py-2 pl-10 pr-4",
                          active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                        )
                      }
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={cn(
                              "block truncate",
                              selected ? "font-medium" : "font-normal"
                            )}
                          >
                            {type.name}
                          </span>
                          {selected && (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                              <svg
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                />
                              </svg>
                            </span>
                          )}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>
        );

      case "configure-properties":
        return (
          <div className="mt-4 space-y-4">
            {properties.map((prop) => (
              <div
                key={prop.name}
                className="grid grid-cols-3 gap-4 items-center"
              >
                <label
                  htmlFor={prop.name}
                  className="text-sm font-medium text-gray-700 capitalize"
                >
                  {prop.name}:
                </label>
                <input
                  type="text"
                  id={prop.name}
                  value={prop.value}
                  onChange={(e) =>
                    handlePropertyChange(prop.name, e.target.value)
                  }
                  className={cn(
                    "col-span-2 rounded-md border-gray-300 shadow-sm",
                    "focus:border-blue-500 focus:ring-blue-500 sm:text-sm",
                    "px-3 py-2 border"
                  )}
                />
              </div>
            ))}
          </div>
        );

      case "preview":
        return (
          <div className="mt-4">
            <h4 className="text-lg font-medium text-gray-900 mb-4">
              Input Preview
            </h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-medium text-gray-700">
                Type: {selectedType.name}
              </p>
              <div className="mt-2 space-y-2">
                {properties.map((prop) => (
                  <p key={prop.name} className="text-sm text-gray-600">
                    <span className="font-medium capitalize">{prop.name}:</span>{" "}
                    {prop.value || "(not set)"}
                  </p>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  const modalTitle = {
    "select-type": "Select Input Type",
    "configure-properties": "Configure Input Properties",
    preview: "Preview Input Configuration",
  }[currentStep];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Welcome to EasyBPM
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          A simple and efficient project management tool
        </p>
        <div className="mt-10">
          <button
            onClick={handleOpenModal}
            className={cn(
              "rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm",
              "hover:bg-blue-500 focus-visible:outline focus-visible:outline-2",
              "focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            )}
          >
            Open Modal
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title={modalTitle}>
        {renderStepContent()}

        <div className="mt-6 flex justify-between">
          {currentStep !== "select-type" && (
            <button
              type="button"
              className={cn(
                "inline-flex justify-center rounded-md bg-gray-100 px-3 py-2 text-sm",
                "font-semibold text-gray-900 shadow-sm hover:bg-gray-200"
              )}
              onClick={handleBack}
            >
              Back
            </button>
          )}
          <div className="flex-1" />
          <button
            type="button"
            className={cn(
              "inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm",
              "font-semibold text-white shadow-sm hover:bg-blue-500",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
              "focus-visible:outline-blue-600"
            )}
            onClick={currentStep === "preview" ? handleCloseModal : handleNext}
          >
            {currentStep === "preview" ? "Finish" : "Next"}
          </button>
        </div>
      </Modal>
    </main>
  );
}