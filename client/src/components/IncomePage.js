import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dateExtractor from "../utility/DateExtractor";
import Button from "./Button";
import Modal from "./Modal";

const IncomePage = () => {
  const [income, setIncome] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalInput, setModalInput] = useState({ field: "", value: "" });
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/income/byId/${id}`)
      .then((response) => {
        if (!response.data) {
          navigate("/pagenotfound");
        } else setIncome(response.data);
      });
  }, []);

  const handleDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/income/${id}`)
      .then(() => {
        navigate("/income");
      });
  };

  const handleUpdate = () => {
    axios
      .put(`${process.env.REACT_APP_SERVER_URL}/income/${id}`, income, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        navigate("/income");
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
      setIncome({ ...income, incomeTitle: value });
    } else if (field === "location") {
      setIncome({ ...income, incomeLocation: value });
    } else {
      setIncome({ ...income, incomeValue: value });
    }
    setShowModal(false);
  };

  return (
    <div className="incomeContainerPage shadow-md mt-16">
      <div className="income flex justify-center mb-4">
        <div className="titleContainer w-3/5">
          <div className="incomeDate text-gray-500">
            {dateExtractor(new Date(income?.createdAt))}
          </div>
          <div
            className="incomeTitle font-mono"
            onClick={() => handleClick("title", income?.incomeTitle)}
          >
            {income?.incomeTitle}
          </div>
          <div
            className="incomeLocation text-gray-500"
            onClick={() => handleClick("location", income?.incomeLocation)}
          >
            {income?.incomeLocation || "Add location"}
          </div>
        </div>
        <div
          className="incomeValue w-2/5"
          onClick={() => handleClick("value", income?.incomeValue)}
        >
          {income?.incomeValue} KM
        </div>
      </div>
      <hr />
      <div className="flex flex-row space-x-3 m-2 p-2">
        <Button
          type="button"
          className="bg-cyan-500 shadow-cyan-600/50 hover:bg-cyan-600/90"
          onClick={handleUpdate}
        >
          Update
        </Button>
        <Button
          type="button"
          className="bg-red-500 shadow-red-600/50 hover:bg-red-600/90"
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

export default IncomePage;
