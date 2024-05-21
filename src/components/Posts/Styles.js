import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  Container: {
    display: 'flex',
    alignItems: 'center',
    flexWrap:'wrap'
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
}));