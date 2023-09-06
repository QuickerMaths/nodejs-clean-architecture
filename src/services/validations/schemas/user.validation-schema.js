export default {
  type: "object",
  properties: {
    username: { type: "string", minLength: 3, maxLength: 20 },
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 6, maxLength: 20 },
  },
  required: ["username", "email", "password"],
  additionalProperties: false,
};
