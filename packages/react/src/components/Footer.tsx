import type { HTMLAttributes } from "react";

/**
 * Render the footer of the calendar.
 *
 * @group Components
 * @see https://daypicker.dev/guides/custom-components
 */
export function Footer(props: HTMLAttributes<HTMLDivElement>) {
	return <div {...props} />;
}

export type FooterProps = Parameters<typeof Footer>[0];
