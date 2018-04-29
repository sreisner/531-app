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

const assignGroup = (group, rows) => rows
    .map(row => ({...row, group}));

const warmupRows = [
    { activity: 'Limber 11' },
    { activity: 'Band pull-aparts', reps: 10, sets: 3 },
    { activity: 'Shoulder dislocations', reps: 10, sets: 1 },
    { activity: '30 second paused bodyweight squat' }
];

const jumpsThrowsRows = [
    { activity: 'Band pull-aparts', reps: 10 },
];

const roundUpToNearest = (num, nearest) => num + nearest - ((num + nearest) % nearest);

const SMALLEST_PLATE_SIZE = 2.5;
const SQUAT_TM = 245;

const calculateSetWeight = (tm, percOfTm) =>
    roundUpToNearest(tm * percOfTm, SMALLEST_PLATE_SIZE * 2);

const squatWarmupRows = [.4, .5, .6]
    .map(percOfTm => ({
        activity: 'Squat',
        weight: calculateSetWeight(SQUAT_TM, percOfTm),
        reps: 5,
        sets: 1
    }));

const squatWorkingRows = [.65, .75, .85]
    .map(percOfTm => ({
        activity: 'Squat',
        weight: calculateSetWeight(SQUAT_TM, percOfTm),
        reps: 5,
        sets: 1
    }));

const squatSupplementalRows = [{
    activity: 'Squat',
    weight: calculateSetWeight(SQUAT_TM, .4),
    reps: 10,
    sets: 5
}];

const accessoryRows = [
    { activity: 'Push', reps: '25 - 50' },
    { activity: 'Pull', reps: '25 - 50' },
    { activity: 'Ab/Single Leg', reps: '25 - 50' },
]

const rows = [
    ...assignGroup('Warmpup/Mobility', warmupRows),
    ...assignGroup('Jumps/Throws', jumpsThrowsRows),
    ...assignGroup('Squat Warmup Sets', squatWarmupRows),
    ...assignGroup('Squat Working Sets', squatWorkingRows),
    ...assignGroup('Squat Supplemental Sets', squatSupplementalRows),
    ...assignGroup('Accessories', accessoryRows),
].map((row, index) => ({...row, id: index}));

class WorkoutTable extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Paper>
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
            </div>
        );
    }
}

WorkoutTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WorkoutTable);
