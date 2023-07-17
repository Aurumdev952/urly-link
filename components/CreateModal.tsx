"use client";
import { AiOutlinePlus } from "react-icons/ai";
import { BiCopy } from "react-icons/bi";
import { createId } from "@paralleldrive/cuid2";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useSWRConfig } from "swr";
import { linkCreateType } from "@/server/schema";
import useSWRMutation from "swr/mutation";
import { useCopyToClipboard } from "usehooks-ts";
import z from "zod";
const CreateModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [next, setNext] = useState(false);
  const [value, setValue] = useState("");
  const [input, setInput] = useState("");
  const [copy_value, copy] = useCopyToClipboard();
  const { mutate } = useSWRConfig();
  const { trigger, isMutating } = useSWRMutation(
    "/api/data/crud",
    async (url, { arg }: { arg: linkCreateType }) => {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(arg),
      });
      return res.json();
    },
    {
      onSuccess(data, key, config) {
        setValue(`http://localhost:3000/${data[0].uid}`);
        setNext(true);
        mutate("/api/data/1")
      },
    }
  );
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setNext(false);
    setIsOpen(true);
  }

  return (
    <>
      <button className="btn btn-sm" onClick={openModal}>
        <AiOutlinePlus /> create
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
                  {!next ? (
                    <>
                      <div className="model-box flex flex-col items-center justify-center gap-3 w-[25rem]">
                        <h1>create new link</h1>
                        <div className="form-control w-full max-w-xs">
                          <label className="label">
                            <span className="label-text">url</span>
                          </label>
                          <input
                            type="text"
                            name="url"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="url..."
                            className="input input-sm input-bordered w-full max-w-xs"
                          />
                        </div>
                        <div className="flex justify-end w-[20rem]">
                          <button
                            className="btn btn-sm"
                            onClick={async () => {
                              if (input.length > 0) {
                                const url = z.string().url().parse(input)
                                if (url) {
                                  await trigger({
                                    uid: createId(),
                                    url: input,
                                    user_id: 1,
                                  });
                                }
                              }
                            }}
                          >
                            {isMutating && (
                              <>
                                <span className="loading loading-spinner"></span>
                                loading
                              </>
                            )}
                            {!isMutating && <>Create link</>}
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="model-box flex flex-col items-center justify-center gap-3 w-[25rem]">
                        <h1>here is your newly created link</h1>
                        <div className="w-full max-w-xs flex">
                          <input
                            readOnly
                            type="text"
                            value={value}
                            placeholder="url..."
                            className="input input-sm input-bordered w-full max-w-xs"
                          />
                          <button
                            onClick={() => copy(value)}
                            className="btn btn-sm ml-1"
                          >
                            <BiCopy />
                          </button>
                        </div>
                        <div className="flex justify-end w-[20rem]">
                          <button onClick={closeModal} className="btn btn-sm">
                            Close
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CreateModal;
