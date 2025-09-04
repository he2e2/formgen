import { z } from 'zod';
import type {
  FormField,
  TextField,
  NumberField,
  CheckboxField,
  ChoiceField,
  DateField,
} from '../types';
import { buildText } from './textBuilder';
import { buildNumber } from './numberBuilder';
import { buildCheckbox } from './checkboxBuilder';
import { buildChoice } from './choiceBuilder';
import { buildDate } from './dateBuilder';
import { getUnsupportedFieldMessage } from './messageUtils';

export const buildFieldSchema = (field: FormField): z.ZodTypeAny => {
  let baseSchema: z.ZodTypeAny;

  switch (field.type) {
    case 'text':
    case 'email':
    case 'password':
    case 'textarea':
      baseSchema = buildText(field as TextField);
      break;

    case 'number':
      baseSchema = buildNumber(field as NumberField);
      break;

    case 'checkbox':
      baseSchema = buildCheckbox(field as CheckboxField);
      break;

    case 'select':
    case 'radio':
      baseSchema = buildChoice(field as ChoiceField);
      break;

    case 'date':
      baseSchema = buildDate(field as DateField);
      break;

    default: {
      const _never: never = field;
      throw new Error(getUnsupportedFieldMessage(_never));
    }
  }

  if (field.validateWith) {
    baseSchema = field.validateWith(baseSchema);
  }

  return baseSchema;
};
