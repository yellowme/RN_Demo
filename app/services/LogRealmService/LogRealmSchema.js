export const LogRealmSchema = {
  name: 'Log',
  primaryKey: 'id',
  properties: {
    id: 'string',
    title: 'string',
    date: 'date',
    content: 'string',
    formattedContent: 'string',
    image: 'string?'
  }
};
