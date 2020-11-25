import { Button, Grid, makeStyles, Paper } from '@material-ui/core'
import React from 'react'
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'
import { Field, FieldArray, Form, Formik } from 'formik'
import { RootState } from '../../../store/store'
import { useDispatch, useSelector } from 'react-redux'
import { setCandidates } from '../../../features/electionFormSlice'

const useStyles = makeStyles({
  root: {
    minHeight: '60vh'
  },
  item: {
    width: '60vw',
    margin: '4px'
  },
  paper: {
    padding: '8px'
  },
  nameField: {
    width: '20vw',
    margin: '4px',
    fontSize: '1.2rem',
    padding: '8px'
  },
  descriptionField: {
    width: '40vw',
    margin: '4px',
    fontSize: '1.2rem',
    padding: '8px'
  },
  navPanel: {
    padding: '8px',
    width: '60vw',
    margin: '10px'
  }
})

function AddCandidatesForm ({ next, previous }: any) {
  const classes = useStyles()
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
                <Grid className={classes.root} container direction='column'>
                  {values.candidates.map((item, index) => (
                    <Grid
                      key={index}
                      className={classes.item}
                      container
                      justify='space-evenly'
                      alignItems='center'
                    >
                      <Paper className={classes.paper} elevation={4}>
                        <Grid container direction='column'>
                          <label>
                            Candidate
                            <Field
                              className={classes.nameField}
                              name={`candidates.${index}.candidate_name`}
                              required
                            />
                          </label>
                          <label>
                            Description
                            <Field
                              className={classes.descriptionField}
                              name={`candidates.${index}.candidate_description`}
                              required
                            />
                          </label>
                        </Grid>
                      </Paper>
                      <Button
                        color='secondary'
                        variant='contained'
                        onClick={() => remove(index)}
                      >
                        <RemoveIcon />
                      </Button>
                    </Grid>
                  ))}
                  <Grid container justify='center'>
                    <Button
                      color='primary'
                      variant='contained'
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
                </Grid>
              )}
            </FieldArray>
            <Grid
              className={classes.navPanel}
              container
              justify='space-between'
            >
              <Button color='primary' variant='contained' onClick={previous}>
                Previous
              </Button>
              <Button color='primary' variant='contained' type='submit'>
                Next
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </Grid>
  )
}

export default AddCandidatesForm
