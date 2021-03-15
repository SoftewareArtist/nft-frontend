import React from 'react';
import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grow,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  OutlinedInput,
  FilledInput,
  Paper,
  Link,
  Grid,
  CssBaseline,
  FormLabel,
  MenuItem,
  FormGroup,
  FormControlLabel,
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';
import { Form, Field } from 'react-final-form';
import { TextField, Checkbox, Radio, Select } from 'final-form-material-ui';

import CustomButton from 'components/Buttons/CustomButton';
import { useStyle } from './style';

const Transition = React.forwardRef((
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>,
) => <Grow in ref={ref} {...props} />);

interface Props {
  open: boolean;
  onClose: ()=>void;
}

export default function CreateNFTDialog({ open, onClose }:Props) {
  const classes = useStyle();
  const [name, setName] = React.useState('Composed TextField');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const handleClose = () => {
    onClose();
  };

  const onSubmit = async (values) => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    await sleep(300);
    window.alert(JSON.stringify(values));
  };
  const validate = (values) => {
    const errors:any = {};
    if (!values.token_name) {
      errors.token_name = 'Required';
    }
    return errors;
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      // aria-labelledby="alert-dialog-slide-title"
      // aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle className={classes.dialogTitle}>
        Create Your collection
        <Typography>
          You can change these values later, along with configuring external URLs, payment options, and trading fees.
        </Typography>
      </DialogTitle>
      <DialogContent className={classes.formContent}>
        <Form
          onSubmit={onSubmit}
          initialValues={{ employed: true, stooge: 'larry' }}
          validate={validate}
          render={({ handleSubmit, reset, submitting, pristine, values }:any) => (
            <form onSubmit={handleSubmit} noValidate>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    required
                    name="token_name"
                    component={TextField}
                    type="text"
                    label="Name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="description"
                    component={TextField}
                    multiline
                    label="Description"
                  />
                </Grid>
                <Grid item xs={12} style={{ marginTop: 16, textAlign: 'center' }}>
                  <CustomButton
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.createBtn}
                    disabled={submitting}
                  >
                    Create
                  </CustomButton>
                </Grid>
              </Grid>
            </form>
          )}
        />
      </DialogContent>
    </Dialog>
  );
}