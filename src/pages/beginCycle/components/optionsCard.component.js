import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { TitleCard } from './titleCard.component';
import { Typography, MenuItem } from 'material-ui';
import { FormControl } from 'material-ui';
import { InputLabel } from 'material-ui';
import { Select } from 'material-ui';
import { FormControlLabel } from 'material-ui';
import { Switch } from 'material-ui';

const styles = theme => ({});

class OptionsCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.getOptionsMetaDefaultValue = this.getOptionsMetaDefaultValue.bind(
      this
    );

    this.buildOptionsMeta = this.buildOptionsMeta.bind(this);
  }

  getOptionsMetaDefaultValue(key) {
    const optionsMeta = this.buildOptionsMeta();

    return optionsMeta.find(m => m.key === key).defaultValue;
  }

  buildOptionsMeta() {
    const { selectedTemplate, selectedVariant } = this.props;

    const templateOptions = selectedTemplate.options || [];
    const variantOptions = selectedVariant.options || [];

    return [...templateOptions, ...variantOptions];
  }

  render() {
    const {
      selectedTemplate,
      selectedVariant,
      optionValues,
      onChange,
    } = this.props;

    const optionsMeta = this.buildOptionsMeta();

    return (
      <TitleCard title="Options">
        {!selectedTemplate._id || !selectedVariant.id ? (
          <Typography variant="caption">
            Select a template to customize options.
          </Typography>
        ) : optionsMeta.length === 0 ? (
          <Typography variant="caption">
            There are no options available for this template.
          </Typography>
        ) : (
          optionsMeta.map(o => {
            const value = optionValues[o.key];
            if (o.type === 'select') {
              return (
                <FormControl key={o.key}>
                  <InputLabel htmlFor={o.key}>{o.displayText}</InputLabel>
                  <Select
                    value={value}
                    onChange={e => onChange(o.key, e.target.value)}
                    inputProps={{ name: o.key }}
                  >
                    {o.values.map(v => (
                      <MenuItem key={v.value} value={v.value}>
                        {v.displayText}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              );
            } else if (o.type === 'boolean') {
              return (
                <FormControlLabel
                  key={o.key}
                  control={
                    <Switch
                      checked={value}
                      onChange={e => onChange(o.key, e.target.checked)}
                      value={value.toString()}
                    />
                  }
                  label={o.displayText}
                />
              );
            } else {
              return null;
            }
          })
        )}
      </TitleCard>
    );
  }
}

OptionsCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

OptionsCard = withStyles(styles)(OptionsCard);
export { OptionsCard };
