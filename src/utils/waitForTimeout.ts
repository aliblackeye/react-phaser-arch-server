export const waitForTimeout = async (seconds: number) => {
	await new Promise((r) => setTimeout(r, seconds * 1000));
};