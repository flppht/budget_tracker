import { useState } from "react";
import ReactDOM from "react-dom";
import Button from "./Button";

const Modal = ({ input, onClose, onSave }) => {
  const [value, setValue] = useState(input.value);

  const handleSave = () => {
    onSave({ ...input, value });
  };

  const isInputValid = () => {
    let pattern;
    if (input.field === "value") {
      pattern = /^[0-9]*\.?[0-9]+$/;
    } else if (input.field === "location") {
      pattern = /^.{3,25}$/;
    } else {
      return true;
    }
    return pattern.test(value);
  };

  const invalidValue = input.field === "value" && (
    <p className="text-red-500 ml-4 text-sm">
      Must be a positive integer or decimal number.
    </p>
  );
  const invalidLocation = input.field === "location" && (
    <p className="text-red-500 ml-4 text-sm">
      Input must be between 3 and 25 letters.
    </p>
  );

  return ReactDOM.createPortal(
    <div>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-gray-300 opacity-80"
      ></div>
      <div className="modalContainer fixed bg-slate-100 p-10 flex flex-col items-center">
        <div className="flex flex-col">
          <label className="font-semibold ml-4">Edit value:</label>
          {!isInputValid() && (invalidValue || invalidLocation)}
          <input
            value={value}
            id="inputEditValue"
            onChange={(event) => setValue(event.target.value)}
            className="w-80"
          />
        </div>
        <Button
          type="submit"
          onClick={handleSave}
          className="bg-slate-500 mt-5 hover:bg-slate-600/90"
          disabled={!isInputValid()}
        >
          Save
        </Button>
      </div>
    </div>,
    document.querySelector(".modal-container")
  );
};

export default Modal;
