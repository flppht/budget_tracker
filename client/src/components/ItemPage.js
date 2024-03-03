import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dateExtractor from "../utility/DateExtractor";
import Button from "./Button";
import Modal from "./Modal";

const ItemPage = ({ endpoint }) => {
  const [item, setItem] = useState({});
  let { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [modalInput, setModalInput] = useState({ field: "", value: "" });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/${endpoint}/byId/${id}`)
      .then((response) => {
        if (!response.data) {
          navigate("/pagenotfound");
        } else setItem(response.data);
      });
  }, []);

  const handleDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/${endpoint}/${id}`)
      .then(() => {
        navigate(`/${endpoint}`);
      });
  };

  const handleUpdate = () => {
    axios
      .put(`${process.env.REACT_APP_SERVER_URL}/${endpoint}/${id}`, item)
      .then(() => {
        navigate(`/${endpoint}`);
      });
  };

  const handleClick = (field, value) => {
    setShowModal(true);
    setModalInput({ field, value });
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSave = ({ field, value }) => {
    if (field === "title") {
      setItem({ ...item, title: value });
    } else if (field === "location") {
      setItem({ ...item, location: value });
    } else {
      setItem({ ...item, value: value });
    }
    setShowModal(false);
  };

  return (
    <div className="itemContainerPage shadow-md mt-16">
      <div className="item flex justify-center mb-4">
        <div className="titleContainer w-3/5">
          <div className="itemDate text-gray-500">
            {dateExtractor(new Date(item?.createdAt))}
          </div>
          <div
            className="itemTitle font-mono"
            onClick={() => handleClick("title", item?.title)}
          >
            {item?.title}
          </div>
          <div
            className="itemLocation text-gray-500"
            onClick={() => handleClick("location", item?.location)}
          >
            {item?.location || "Add location"}
          </div>
        </div>
        <div
          className="itemValue w-2/5"
          onClick={() => handleClick("value", item?.value)}
        >
          {endpoint === "expenses" ? "-" : ""}
          {item?.value} KM
        </div>
      </div>
      <hr />
      <div className="flex flex-row space-x-3 m-2 p-2">
        <Button
          type="button"
          className="bg-cyan-500 dark:bg-cyan-600 shadow-cyan-600/50 hover:bg-cyan-600/90"
          onClick={handleUpdate}
        >
          Update
        </Button>
        <Button
          type="button"
          className="bg-red-500 dark:bg-red-600 shadow-red-600/50 hover:bg-red-600/90"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
      {showModal && (
        <Modal input={modalInput} onClose={handleClose} onSave={handleSave} />
      )}
    </div>
  );
};

export default ItemPage;
