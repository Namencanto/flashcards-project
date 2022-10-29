export default function CreateInput(props) {
  return (
    <input
      onChange={props.inputEmailValidation}
      ref={inputEmailRef}
      id={props.id}
      type={props.type}
      placeholder=" "
    />
  );
}
