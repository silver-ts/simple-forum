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
    email: {
      key: 'emailInvalid'
    }
  }
}
