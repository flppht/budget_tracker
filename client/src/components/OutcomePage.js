import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dateExtractor from "../utility/DateExtractor";
import Button from "./Button";

const OutcomePage = () => {
  const [outcome, setOutcome] = useState({});
  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/outcomes/byId/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          setOutcome(response.data);
        }
      });
  }, []);

  return (
    <div className="outcomeContainerPage shadow-md mt-16">
      <div className="outcome flex justify-center mb-4">
        <div className="titleContainer w-3/5">
          <div className="outcomeDate text-sm font-normal text-gray-500">
            {dateExtractor(new Date(outcome.createdAt))}
          </div>
          <div className="font-mono mt-1 font-semibold">
            {outcome.outcomeTitle}
          </div>
          <div className="outcomeLocation text-sm font-normal text-gray-500 italic">
            {outcome.outcomeLocation}
          </div>
        </div>
        <div className="outcomeValue w-2/5 font-semibold align-bottom">
          -{outcome.outcomeValue} KM
        </div>
      </div>
      <hr />
      <div className="flex flex-row space-x-3 m-2 p-2">
        <Button type="button" className="bg-cyan-500 shadow-cyan-600/50">
          Update
        </Button>
        <Button type="button" className="bg-red-500 shadow-red-600/50">
          Delete
        </Button>
      </div>
    </div>
  );
};

export default OutcomePage;
