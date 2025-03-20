"use client";

import { useState } from "react";
import { Modal } from "@/components/Modal";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

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
        title="Welcome to EasyBPM"
      >
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            This is a sample modal dialog. You can customize this content to
            show any information or forms you need.
          </p>
        </div>
        <div className="mt-4">
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
            Got it, thanks!
          </button>
        </div>
      </Modal>
    </main>
  );
}
