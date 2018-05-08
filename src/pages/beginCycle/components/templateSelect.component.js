import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Select, MenuItem } from 'material-ui';

const styles = theme => ({});

class TemplateSelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            templates: []
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        setTimeout(() => this.setState({
            loading: false,
            templates: [{
                id: 1,
                name: 'Forever BBB'
            }, {
                id: 2,
                name: 'Original BBB'
            }]
        }), 3000);
    }

    handleChange(event) {
        this.props.onChange(event.target.value);
    }

    render() {
        const { loading } = this.state;
        return (
            <Select
                value={this.props.value}
                onChange={this.handleChange}
                disabled={loading}
            >
                {this.state.templates.map(t =>
                    <MenuItem
                        key={t.id}
                        value={t.id}
                    >
                        {t.name}
                    </MenuItem>
                )}
            </Select>
        );
    }
}

TemplateSelect.propTypes = {
    classes: PropTypes.object.isRequired
};

TemplateSelect = withStyles(styles)(TemplateSelect);
export { TemplateSelect };