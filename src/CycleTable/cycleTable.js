import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

const data = [
];

function CycleTable(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell numeric></TableCell>
            <TableCell numeric></TableCell>
            <TableCell numeric></TableCell>
            <TableCell numeric></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => {
            return (
              <TableRow key={n.id}>
                <TableCell></TableCell>
                <TableCell numeric></TableCell>
                <TableCell numeric></TableCell>
                <TableCell numeric></TableCell>
                <TableCell numeric></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

CycleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CycleTable);