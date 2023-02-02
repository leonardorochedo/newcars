import "./Input.css";

export function Input({ 
    type,
    text,
    name,
    placeholder,
    handleChangeInput,
    id,
    value,
    multiple 
}) {

    return (
        <div className="form-input">
            <label htmlFor={name}>{text}:</label>
            <input 
            type={type} 
            name={name} 
            onChange={handleChangeInput} 
            id={id} 
            placeholder={placeholder} 
            value={value}
            {...(multiple ? {multiple} : '')} />
        </div>
    );
}