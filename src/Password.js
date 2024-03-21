import React, { useState, useRef, useCallback } from "react";
import { FaCopy } from "react-icons/fa";
import CheckboxWithLabel from "./CheckboxWithLabel";
import ToggleButton from "./ToggleButton";

const Password = () => {
  const [isUppercaseChecked, setUppercaseChecked] = useState(true);
  const [isLowercaseChecked, setLowercaseChecked] = useState(false);
  const [isNumbersChecked, setNumbersChecked] = useState(false);
  const [isSymbolsChecked, setSymbolsChecked] = useState(true);
  const [passwordLength, setPasswordLength] = useState(5);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [isDarkMode, setDarkMode] = useState(false);

  const toggleMode = () => {
    setDarkMode(!isDarkMode);
  };

  // Ref for generated password input field
  const generatedPasswordRef = useRef(null);

  // useCallback for handleCopyPassword function
  const handleCopyPassword = useCallback(() => {
    if (!generatedPassword) {
      alert("Pehle Password tho generate karle Bhai :).");
      return;
    }
    navigator.clipboard.writeText(generatedPassword).then(() => {
      window.alert("Password copied!");
    });
  }, [generatedPassword]);

  // useCallback for generatePassword function
  const generatePassword = useCallback(() => {
    // Checking to include at least one checkbox
    if (
      !isUppercaseChecked &&
      !isLowercaseChecked &&
      !isNumbersChecked &&
      !isSymbolsChecked
    ) {
      alert("Are Bhai ek tho checkbox select karle :)");
      return;
    }

    // Characters of uppercase, lowercase, numbers, symbols
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+-=[]{}|;:'\",.<>/?";

    // Including characters based on the checked checkboxes
    let charactersToInclude = "";
    if (isUppercaseChecked) charactersToInclude += uppercaseChars;
    if (isLowercaseChecked) charactersToInclude += lowercaseChars;
    if (isNumbersChecked) charactersToInclude += numberChars;
    if (isSymbolsChecked) charactersToInclude += symbolChars;

    // Generating random password
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(
        Math.random() * charactersToInclude.length
      );
      password += charactersToInclude[randomIndex];
    }

    setGeneratedPassword(password);
  }, [
    isUppercaseChecked,
    isLowercaseChecked,
    isNumbersChecked,
    isSymbolsChecked,
    passwordLength,
  ]);

  return (
    <div style={{ backgroundColor: isDarkMode ? "black" : "white" }}>
      <div className="mt-8 flex flex-col gap-12">
        <div className="text-center text-3xl font-bold">
          <h1 className="uppercase underline text-gray-500">
            Password Generator
          </h1>
          <ToggleButton
            toggleMode={() => setDarkMode(!isDarkMode)}
            isDarkMode={isDarkMode}
          />
        </div>
        <div className="flex justify-evenly">
          <input
            ref={generatedPasswordRef}
            type="text"
            placeholder="Generated Password"
            defaultValue={generatedPassword}
            className="w-3/4 border bg-gray-500 text-xl text-white rounded-lg"
          />
          <FaCopy
            className="cursor-pointer h-12 w-12"
            onClick={handleCopyPassword}
          />
        </div>

        <div className="flex justify-between mx-8">
          <h3 className="text-lg text-gray-600 bg-green-300">
            Select Password Length <strong>(</strong>From <strong>5</strong> to
            <strong>100 characters)</strong>
          </h3>
          <input
            type="number"
            min={5}
            max={100}
            value={passwordLength}
            placeholder="5-100"
            onChange={(e) => setPasswordLength(parseInt(e.target.value, 10))}
            className="border rounded-lg"
          />
        </div>
        <div className="flex flex-col ml-8">
          <CheckboxWithLabel
            id="uppercase"
            checked={isUppercaseChecked}
            onChange={() => setUppercaseChecked(!isUppercaseChecked)}
            label="Uppercase"
          />
          <CheckboxWithLabel
            id="lowercase"
            checked={isLowercaseChecked}
            onChange={() => setLowercaseChecked(!isLowercaseChecked)}
            label="Lowercase"
          />
          <CheckboxWithLabel
            id="numbers"
            checked={isNumbersChecked}
            onChange={() => setNumbersChecked(!isNumbersChecked)}
            label="Numbers"
          />
          <CheckboxWithLabel
            id="symbols"
            checked={isSymbolsChecked}
            onChange={() => setSymbolsChecked(!isSymbolsChecked)}
            label="Symbols"
          />
        </div>
        <div className="text-center">
          <button
            className="bg-blue-700 text-white w-32 px-4 py-2 uppercase rounded-xl"
            onClick={generatePassword}
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default Password;
