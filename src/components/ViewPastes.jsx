import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

function ViewPastes() {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((p) => p._id === id)[0];
  console.log("Final Paste : ", paste);

  return (
    <>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          type="text"
          className="pl-3 text-orange-300 m-2 rounded-2xl mt-3 w-[60%]"
          placeholder="Enter Your Title"
          disabled
          value={paste.title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* <button className="p-2 m-2 rounded-2xl mt-3" onClick={createPaste}>
          {pasteId ? "Update My Paste" : "Create My Paste"}{" "}
        </button> */}
        <button>
          <a
            onClick={() => {
              navigator.clipboard.writeText(paste?.content);
              toast.success("Copied Successfully");
            }}
          >
            Copy
          </a>
        </button>
      </div>

      <div>
        <textarea
          name=""
          className="w-[500px] p-4 rounded-2xl"
          rows="20"
          type="text"
          placeholder="Enter Your Content Here"
          disabled
          value={paste.content}
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
      </div>
    </>
  );
}

export default ViewPastes;
