const createNoteSchema = {
  type: "object",
  properties: {
    title: { type: "string", minLength: 10, maxLength: 100 },
    content: { type: "string", minLength: 10, maxLength: 1000 },
    important: { type: "boolean" },
    userId: { type: "string" },
  },
  required: ["title", "content", "userId"],
  additionalProperties: false,
};

const updateNoteSchema = {
  type: "object",
  properties: {
    title: { type: "string", minLength: 10, maxLength: 100 },
    content: { type: "string", minLength: 10, maxLength: 1000 },
    important: { type: "boolean" },
  },
  additionalProperties: false,
};

export { createNoteSchema, updateNoteSchema };
