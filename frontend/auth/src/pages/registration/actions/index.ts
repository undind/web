import gql from 'graphql-tag'
import * as actions from '../constants'

export const change = (field, value) => ({
  type: actions.change,
  field,
  value,
})

export const setError = (errors: string) => ({
  type: actions.setErrors,
  errors
})

export const register = () => async (dispatch, getState, client) => {
  const { email, password } = getState().auth.registration

  try {
    const { data } = await client.mutate({
      mutation: gql`
        mutation Register($input: RegisterUserInput!) {
          register(input: $input) {
            errors {
              email
              password
            }
          }
        }
      `,
      variables: {
        input: {
          email,
          password,
        },
      },
    })

    if (data.register.errors) {
      dispatch({
        type: actions.setErrors,
        errors: data.register.errors,
      })
    } else {

      dispatch(loginActions.login());

      dispatch({
        type: actions.clear,
      })
    }
  } catch (error) {
    
    dispatch({
      type: actions.clear,
    })
  }
}

export const clear = () => ({
  type: actions.clear,
})
