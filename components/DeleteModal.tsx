"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { RiDeleteBin6Line } from "react-icons/ri";

const DeleteModal: React.FC<{ id: number }> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate } = useSWRConfig();
  const { trigger, isMutating } = useSWRMutation(
    "/api/data/crud",
    async (url, { arg }: { arg: number }) => {
      const res = await fetch(url, {
        method: "DELETE",
        body: JSON.stringify({ id: arg }),
      });
      return res.json();
    },
    {
      onSuccess(data, key, config) {
        mutate("/api/data");
        setIsOpen(false);
      },
    }
  );
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button className="btn btn-sm btn-error" onClick={openModal}>
        <RiDeleteBin6Line />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-info-content">
                  <button
                    onClick={closeModal}
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                  >
                    ✕
                  </button>
                  <div className="model-box flex flex-col items-center justify-center gap-3 w-[25rem]">
                    <h1>are you sure you want to delete the link?</h1>

                    <div className="flex justify-between w-[20rem] items-center">
                      <button
                        className="btn btn-sm btn-error"
                        onClick={async () => {
                          await trigger(id);
                        }}
                      >
                        {isMutating && (
                          <>
                            <span className="loading loading-spinner"></span>
                            loading
                          </>
                        )}
                        {!isMutating && <>delete link</>}
                      </button>
                      <button className="btn btn-sm" onClick={closeModal}>
                        cancel
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default DeleteModal;
