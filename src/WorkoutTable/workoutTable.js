import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import {
  GroupingState,
  IntegratedGrouping,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableGroupRow,
  TableColumnVisibility
} from '@devexpress/dx-react-grid-material-ui';

const styles = theme => ({});

class WorkoutTable extends React.Component {
    render() {
        const { classes, rows, week, day } = this.props;
        return (
            <Paper className={classes.root}>
                <h1>{`Week ${week}, Day ${day}`}</h1>
                <Grid
                    rows={rows}
                    columns={[
                        { name: 'id', title: 'ID' },
                        { name: 'group', title: 'Group' },
                        { name: 'activity', title: 'Activity' },
                        { name: 'weight', title: 'Weight' },
                        { name: 'reps', title: '# Reps' },
                        { name: 'sets', title: '# Sets' },
                    ]}>
                    <GroupingState
                        grouping={[{ columnName: 'group' }]}
                    />
                    <IntegratedGrouping />
                    <Table />
                    <TableColumnVisibility defaultHiddenColumnNames={['id', 'group']} />
                    <TableHeaderRow />
                    <TableGroupRow />
                </Grid>
            </Paper>
        );
    }
}

WorkoutTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WorkoutTable);
