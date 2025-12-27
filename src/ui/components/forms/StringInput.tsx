import React from "react";

import * as styles from "./StringInput.scss";

interface ComponentProps {
  /**
   * A callback function that will be invoked when the user has focused
   * on this component and then removed focus from this component.
   */
  onBlur?: () => void;

  /**
   * A callback function that will be invoked when the user has
   * changed the value currently in this component.
   */
  onChange: (value: string) => void;

  /**
   * An optional configuration property that indicates this input
   * element serves a specific purpose. This can be used to configure
   * various properties (for example, a `username` role will have the
   * input element configured to work with common password autofill
   * browser extensions).
   */
  role?: "username" | "password";

  /**
   * The type of input that this component should accept.
   */
  type: "text" | "password" | "email";

  /**
   * The value currently used in this component
   */
  value: string;
}

function StringInput({
  onBlur,
  onChange,
  role,
  type,
  value,
}: ComponentProps): React.ReactElement {
  // Handle events
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value === value) {
      return;
    }

    onChange(e.target.value);
  };

  const handleBlur = (): void => {
    if (!onBlur) {
      return;
    }

    onBlur();
  };

  // Interpret the `role` attribute
  let autoComplete: string;
  let dataLplIgnore: string | undefined;
  switch (role) {
    case "username": {
      autoComplete = "username";
      break;
    }
    case "password": {
      autoComplete = "password";
      break;
    }
    default: {
      autoComplete = "off";
      dataLplIgnore = "true";
      break;
    }
  }

  // Render the component
  return (
    <input
      className={styles.stringInput}
      data-lpignore={dataLplIgnore}
      autoComplete={autoComplete}
      type={type}
      onBlur={handleBlur}
      onChange={handleChange}
      value={value}
    />
  );
}

export default StringInput;
