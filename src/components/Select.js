import React from 'react'

function Select({ options, value, name, onChange }) {
    return (
        <select name={name} value={value} onChange={onChange}>
            {options?.map((option, index) => (
                <option value={option}>{option}</option>
            ))}
        </select>
    )
}

export default Select