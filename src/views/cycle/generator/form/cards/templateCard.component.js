import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';
import React from 'react';
import TitleCard from './titleCard.component';

let TemplateCard = props => {
  const {
    templates,
    selectedTemplate,
    selectedVariant,
    onTemplateChange,
    onVariantChange,
  } = props;

  const { description = [], variants = [] } = selectedTemplate;

  return (
    <TitleCard title="Template">
      <FormControl>
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

      <FormControl>
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

      <ul>
        {description.map((d, i) => (
          <li key={i}>
            <Typography variant="body1">{d}</Typography>
          </li>
        ))}
      </ul>
    </TitleCard>
  );
};

export default TemplateCard;
