"use client";
import { AiOutlinePlus } from "react-icons/ai";
import { BiCopy } from "react-icons/bi";
import { createId } from "@paralleldrive/cuid2";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useSWRConfig } from "swr";
import { linkCreateType, linkType } from "@/server/schema";
import useSWRMutation from "swr/mutation";
import { useCopyToClipboard } from "usehooks-ts";
import z from "zod";
import { FaRegEdit } from "react-icons/fa";
const UpdateModal: React.FC<linkType> = ({ id, url, alias, uid, user_id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState(() => url);
  const { mutate } = useSWRConfig();
  const { trigger, isMutating } = useSWRMutation(
    "/api/data/crud",
    async (url, { arg }: { arg: linkCreateType }) => {
      const res = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(arg),
      });
      return res.json();
    },
    {
      onSuccess(data, key, config) {
        mutate("/api/data/1");
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
      <button className="btn btn-sm btn-info" onClick={openModal}>
        <FaRegEdit />
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
                    <h1>edit link</h1>
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
                            const url = z.string().url().parse(input);
                            if (url) {
                              await trigger({
                                uid,
                                url: input,
                                user_id,
                                alias,
                                id,

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
                        {!isMutating && <>update link</>}
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

export default UpdateModal;
