export default function Button({
  label = "submit",
  type = "submit",
  clssName,
  onclick,
  ...props
}) {
  return (
    <button
      type={type}
      className={`${clssName} bg-blue-500 font-medium rounded w-full active:bg-blue-400 hover:border`}
      {...props}
      onClick={onclick}
    >
      {label}
    </button>
  );
}
