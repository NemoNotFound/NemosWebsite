import { Accessor, createSignal } from "solid-js";

const createBoolean = (
  initialValue: boolean = false
): [Accessor<boolean>, (newValue?: boolean) => void] => {
  const [value, setValue] = createSignal<boolean>(initialValue);

  /*
    toggle the boolean to the opposite value, or a given value.
  */
  const toggle = (newValue?: boolean) => {
    setValue((prev) => (typeof newValue === "boolean" ? newValue : !prev));
  };

  /*
    return value and toggle function.
  */
  return [value, toggle];
};

export default createBoolean;
