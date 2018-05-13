import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { TitleCard } from './titleCard.component';
import { FormControl } from 'material-ui';
import { InputLabel } from 'material-ui';
import { Select } from 'material-ui';
import { MenuItem } from 'material-ui';

const styles = theme => ({});

class TemplateCard extends React.Component {
  constructor(props) {
    super(props);

    this.handleTemplateChange = this.handleTemplateChange.bind(this);
    this.handleVariantChange = this.handleVariantChange.bind(this);
  }

  handleTemplateChange(event) {
    const templateId = event.target.value;

    this.props.onTemplateChange(templateId);
  }

  handleVariantChange(event) {
    const variantId = event.target.value;

    this.props.onVariantChange(variantId);
  }

  render() {
    const {
      templates,
      selectedTemplate,
      selectedVariant,
      loading,
    } = this.props;

    const { description = [], variants = [] } = selectedTemplate;

    return (
      <TitleCard title="Template" loading={loading}>
        <FormControl>
          <InputLabel>Name</InputLabel>
          <Select
            value={selectedTemplate._id || 0}
            onChange={this.handleTemplateChange}
          >
            {templates.map(t => (
              <MenuItem key={t._id} value={t._id}>
                {t.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>Variant</InputLabel>
          <Select
            value={selectedVariant.id || 0}
            onChange={this.handleVariantChange}
            disabled={!selectedTemplate}
          >
            {variants.map(v => (
              <MenuItem key={v.id} value={v.id}>
                {v.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <ul>{description.map((d, i) => <li key={i}>{d}</li>)}</ul>
      </TitleCard>
    );
  }
}

TemplateCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

TemplateCard = withStyles(styles)(TemplateCard);
export { TemplateCard };
