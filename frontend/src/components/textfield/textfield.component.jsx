import React from "react"

/**
 * A general textfield for user input
 * @param {String} placeholder - The placeholder text 
 * @returns Textfield
 */
const TextField = ({ placeholder, onChange }) => (
  <input
    className="textfield"
    type="text"
    placeholder={placeholder}
    onChange={onChange}
  />
)

export default TextField;