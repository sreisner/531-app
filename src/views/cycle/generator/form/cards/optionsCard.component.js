import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  Typography,
} from '@material-ui/core';
import React from 'react';
import TitleCard from './titleCard.component';

let OptionsCard = props => {
  const { selectedTemplate, selectedVariant, optionValues, onChange } = props;

  const templateOptions = selectedTemplate.options || [];
  const variantOptions = selectedVariant.options || [];
  const optionsMeta = [...templateOptions, ...variantOptions];

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
};

export default OptionsCard;
