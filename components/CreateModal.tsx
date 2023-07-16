"use client";
import { AiOutlinePlus } from "react-icons/ai";

const CreateModal: React.FC = () => {
  return (
    <>
      <button
        className="btn btn-sm"
        //@ts-ignore
        onClick={() => window.my_modal_3.showModal()}
      >
        <AiOutlinePlus /> create
      </button>
      <dialog id="my_modal_3" className="modal">
        <form
          method="dialog"
          className="modal-box flex flex-col items-center justify-center gap-3 w-[25rem]"
        >
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <h1>create new link</h1>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">url</span>
            </label>
            <input
              type="url"
              placeholder="url..."
              className="input input-sm input-bordered w-full max-w-xs"
            />
          </div>
          <div className="flex justify-end max-w-xs">
            <button className="btn btn-sm">Close</button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default CreateModal;
