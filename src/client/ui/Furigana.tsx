import React from "react";

export interface FuriganaClassNames {
  /**
   * A CSS class name that will appear on all HTML elements (both <rp /> and
   * <rt /> elements) that provide the furigana reading, if this is provided
   * and the component is provided furigana to render.
   */
  furigana?: string;

  /**
   * A CSS class name that will appear on the root <span /> element rendered
   * by this component, if provided.
   */
  root?: string;

  /**
   * A CSS class name that will appear on a <span /> element wrapping the
   * primary text, if provided.
   */
  text?: string;
}

interface ComponentProps {
  /**
   * A specification of CSS class names that should be used for rendering this
   * component.
   *
   * If provided an object, each field will be used different as described on
   * {@link FuriganaClassNames}. If provided a string, this will be the CSS
   * class name present on the root <span /> element rendered by this
   * component. As such, providing a string here is the same as specifying
   * {@link FuriganaClassNames.root} via object method.
   */
  className?: FuriganaClassNames | string;
  furigana?: string | null;
  text: string;
}

// Among other things, this globally fixes a bug where <ruby> elements
// in Firefox that are nested directly underneath a { display: flex }
// parent will render with the <rt> floating to the right of the main
// text. Wrapping it in a non-flex parent fixes this issue.

function Furigana({
  className,
  furigana,
  text,
}: ComponentProps): React.ReactElement {
  // Determine the CSS class names to appear where
  let rootClassName: string | undefined;
  let furiganaClassName: string | undefined;
  let textClassName: string | undefined;
  if (typeof className === "object") {
    rootClassName = className.root;
    furiganaClassName = className.furigana;
    textClassName = className.text;
  } else if (typeof className === "string") {
    rootClassName = className;
  }

  // Render the component
  return (
    <span className={rootClassName}>
      <ruby>
        {textClassName ? <span className={textClassName}>{text}</span> : text}
        {furigana && (
          <>
            <rp className={furiganaClassName}>(</rp>
            <rt className={furiganaClassName}>{furigana}</rt>
            <rp className={furiganaClassName}>)</rp>
          </>
        )}
      </ruby>
    </span>
  );
}

export default Furigana;
