import fs from "fs";

export const encodeFileToBase64 = (filePath: string) => {
	const fileData = fs.readFileSync(filePath);
	return Buffer.from(fileData).toString("base64");
};