import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import React, { Component } from 'react';

class TemplateForm extends Component {
  render() {
    const {
      templates,
      selectedTemplate,
      selectedVariant,
      onTemplateChange,
      onVariantChange,
    } = this.props;

    const { description = [], variants = [] } = selectedTemplate;

    return (
      <Grid container direction="column">
        <Grid item>
          <Typography variant="title" gutterBottom>
            Template
          </Typography>
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel>Name</InputLabel>
            <Select
              value={selectedTemplate._id || 0}
              onChange={e => onTemplateChange(e.target.value)}
            >
              {templates.map(t => (
                <MenuItem key={t._id} value={t._id}>
                  {t.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel>Variant</InputLabel>
            <Select
              value={selectedVariant.id || 0}
              onChange={e => onVariantChange(e.target.value)}
              disabled={!selectedTemplate}
            >
              {variants.map(v => (
                <MenuItem key={v.id} value={v.id}>
                  {v.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <ul>
            {description.map((d, i) => (
              <li key={i}>
                <Typography variant="body1">{d}</Typography>
              </li>
            ))}
          </ul>
        </Grid>
      </Grid>
    );
  }
}

export default TemplateForm;
