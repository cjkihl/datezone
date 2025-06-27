import { atom } from "jotai";

export const optionsAtom = atom({
	email: true,
	label: true,
	magicLink: false,
	passkey: false,
	rememberMe: true,
	requestPasswordReset: true,
	signUp: true,
	socialProviders: ["google", "github"],
});
