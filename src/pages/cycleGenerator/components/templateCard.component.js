import React from 'react';
import { TitleCard } from './titleCard.component';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

let TemplateCard = props => {
  const {
    templates,
    selectedTemplate,
    selectedVariant,
    loading,
    onTemplateChange,
    onVariantChange,
  } = props;

  const { description = [], variants = [] } = selectedTemplate;

  return (
    <TitleCard title="Template" loading={loading}>
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

      <ul>{description.map((d, i) => <li key={i}>{d}</li>)}</ul>
    </TitleCard>
  );
};

export { TemplateCard };
