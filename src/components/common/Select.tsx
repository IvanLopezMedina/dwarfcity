import React from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 300,
    },
  }),
);

interface SelectProps {
  label: string;
  selectData: any;
  handleSonChange: (data: [string, string]) => void;
}

const ControlledOpenSelect: React.FC<SelectProps> = ({
  label = '',
  selectData,
  handleSonChange,
}) => {
  const classes = useStyles();
  const [data, setData] = React.useState<any>('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<{value: unknown}>) => {
    setData(event.target.value);
    handleSonChange([label, event.target.value as string]);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">{label}</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={data}
          onChange={handleChange}
        >
          <MenuItem key={''} value={''}>
            {'None'}
          </MenuItem>
          {[...selectData].map((data) => (
            <MenuItem key={data} value={data}>
              {data}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default ControlledOpenSelect;
