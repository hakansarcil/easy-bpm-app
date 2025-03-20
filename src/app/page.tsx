'use client'

import { useState } from 'react'
import { Modal } from '@/components/Modal'
import { cn } from '@/lib/utils'
import { ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { Listbox } from '@headlessui/react'

const INPUT_TYPES = [
  { id: 'text', name: 'Text Input' },
  { id: 'numeric', name: 'Numeric Input' },
  { id: 'datetime', name: 'Date/Time Input' },
  { id: 'checkbox', name: 'Checkbox' },
  { id: 'radio', name: 'Radio Button' },
  { id: 'dropdown', name: 'Dropdown' },
  { id: 'popup', name: 'Popup' },
] as const

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedType, setSelectedType] = useState(INPUT_TYPES[0])

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

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

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Select Input Type"
      >
        <div className="mt-4">
          <Listbox value={selectedType} onChange={setSelectedType}>
            <div className="relative mt-1">
              <Listbox.Button className={cn(
                "relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border",
                "focus:outline-none focus-visible:border-blue-500 focus-visible:ring-2",
                "focus-visible:ring-white/75 focus-visible:ring-offset-2",
                "focus-visible:ring-offset-blue-300 sm:text-sm"
              )}>
                <span className="block truncate">{selectedType.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Listbox.Options className={cn(
                "absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1",
                "text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm",
                "z-50"
              )}>
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
                        <span className={cn(
                          "block truncate",
                          selected ? "font-medium" : "font-normal"
                        )}>
                          {type.name}
                        </span>
                        {selected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" clipRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
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

        <div className="mt-6 flex justify-between">
          <p className="text-sm text-gray-500">
            Selected type: <span className="font-medium">{selectedType.name}</span>
          </p>
          <button
            type="button"
            className={cn(
              "inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm",
              "font-semibold text-white shadow-sm hover:bg-blue-500",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
              "focus-visible:outline-blue-600"
            )}
            onClick={handleCloseModal}
          >
            Confirm Selection
          </button>
        </div>
      </Modal>
    </main>
  )
}