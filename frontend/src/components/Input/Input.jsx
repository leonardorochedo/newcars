import "./Input.css";

export function Input( props ) {
    return (
        <div className="form-input">
            <label htmlFor={props.name}>{props.text}:</label>
            <input type={props.type} name={props.name} onChange={props.handleChangeInput} id={props.id} placeholder={props.placeholder} value={props.value} />
        </div>
    );
}