export const localeSchema = {
  mixed: {
    required: {
      key: 'required'
    },
    oneOf: {
      key: 'passwordMatch'
    }
  },
  string: {
    min: ({ min }) => ({ key: 'min', values: { min } }),
    max: ({ max }) => ({ key: 'max', values: { max } }),
    email: {
      key: 'emailInvalid'
    }
  }
}
