export const jsonToBuffer = (json: any) => {
  const buffer = Buffer.from(JSON.stringify(json));
  return buffer;
};

export const bufferToJson = (buffer: any) => {
  const json = JSON.parse(buffer.toString());
  return json;
};
