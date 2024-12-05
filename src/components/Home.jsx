import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { AddToPastes, UpdateToPastes } from "../redux/pasteSlice";
import { useEffect } from "react";

function Home() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();

  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      // Update
      dispatch(UpdateToPastes(paste));
    } else {
      // Create
      dispatch(AddToPastes(paste));
    }

    // After Update and create
    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          type="text"
          className="pl-3 text-orange-300 m-2 rounded-2xl mt-3 w-[60%]"
          placeholder="Enter Your Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button className="p-2 m-2 rounded-2xl mt-3" onClick={createPaste}>
          {pasteId ? "Update My Paste" : "Create My Paste"}{" "}
        </button>
      </div>
      <div>
        <textarea
          name=""
          className="w-[500px] p-4 rounded-2xl"
          rows="20"
          type="text"
          placeholder="Enter Your Content Here"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
      </div>
    </>
  );
}

export default Home;
