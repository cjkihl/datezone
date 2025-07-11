import type { OptionHTMLAttributes } from "react";

/**
 * Render an `option` element.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
export function Option(props: OptionHTMLAttributes<HTMLOptionElement>) {
	return <option {...props} />;
}

export type OptionProps = Parameters<typeof Option>[0];
