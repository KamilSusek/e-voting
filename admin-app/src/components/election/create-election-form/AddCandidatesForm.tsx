import { Button, Grid, TextField } from '@material-ui/core'
import React from 'react'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import { Field, FieldArray, Form, Formik } from 'formik'
import { RootState } from '../../../store/store'
import { useDispatch, useSelector } from 'react-redux'
import { setCandidates } from '../../../features/electionFormSlice'

function AddCandidatesForm ({ next, previous }: any) {
  const candidates = useSelector(
    (state: RootState) => state.election.candidates
  )
  const dispatch = useDispatch()
  const initialValue = {
    candidates
  }
  return (
    <Grid container direction='column' alignItems='center'>
      <Formik
        initialValues={initialValue}
        onSubmit={values => {
          console.log(values.candidates)
          dispatch(setCandidates(values.candidates))
          next()
        }}
      >
        {({ values }) => (
          <Form>
            <FieldArray name='candidates'>
              {({ remove, push }) => (
                <Grid container direction='column'>
                  {values.candidates.map((item, index) => (
                    <Grid container justify='space-evenly' alignItems='center'>
                      <Grid container direction='column'>
                        <Field
                          name={`candidates.${index}.candidate_name`}
                          // component={TextField}
                          // variant='outlined'
                          // label='Candidate'
                        />
                        <Field
                          name={`candidates.${index}.candidate_description`}
                          // component={TextField}
                          // variant='outlined'
                          // label='Description'
                        />
                      </Grid>
                      <Button onClick={() => remove(index)}>
                        <RemoveIcon />
                      </Button>
                    </Grid>
                  ))}
                  <Button
                    onClick={() =>
                      push({
                        candidate_name: '',
                        candidate_description: ''
                      })
                    }
                  >
                    <AddIcon />
                  </Button>
                </Grid>
              )}
            </FieldArray>
            <Grid container justify='center'>
              <Button onClick={previous}>Previous</Button>
              <Button type='submit'>Next</Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </Grid>
  )
}

export default AddCandidatesForm
