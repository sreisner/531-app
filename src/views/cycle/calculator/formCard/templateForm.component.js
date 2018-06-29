import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import React, { Component } from 'react';
import Loading from '../../../../core/loading/loading.component';
import TemplatesService from '../../../../services/api/templates/templates.service';

class TemplateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      templates: [],
      variants: [],
    };
  }

  loadTemplates = () => {
    return TemplatesService.getTemplates().then(templates =>
      this.setState({
        loading: false,
        templates,
      })
    );
  };

  componentDidMount() {
    this.loadTemplates();
  }

  render() {
    const {
      selectedTemplate,
      selectedVariant,
      onTemplateChange,
      onVariantChange,
    } = this.props;

    const { templates, loading } = this.state;

    const { description = [], variants = [] } = selectedTemplate;

    return (
      <Grid container direction="column">
        <Grid item>
          <Typography variant="title" gutterBottom>
            Template
          </Typography>
        </Grid>
        {loading && <Loading />}
        {!loading && (
          <React.Fragment>
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
          </React.Fragment>
        )}
    </Grid>
    );
  }
}

export default TemplateForm;
