import { type ClientSchema, a, defineData, defineStorage } from "@aws-amplify/backend";

// STORAGE
export const storage = defineStorage({
  name: 'amplifyTeamDrive',
});

// SCHEMAS
const schema = a.schema({
  Juego: a
    .model({
      name: a.string(),
      content: a.string(),
    })
  .authorization((allow) => [allow.publicApiKey()]),
  Comentario: a
  .model({
    name: a.string(),
    content: a.string(),
    likes: a.integer(),
  })
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});