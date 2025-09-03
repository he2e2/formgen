import type { Control } from 'react-hook-form';
import type { FormField } from '../../form-schema';

export interface CommonFieldProps {
  control: Control<any>;
  className: string;
  commonAria: Record<string, any>;
}

export interface FieldClassNames {
  wrapper: string;
  fieldset: string;
  legend: string;
  label: string;
  input: string;
  error: string;
  group: string;
}

export interface FieldRendererProps {
  error?: string;
  fieldWrapperClassName?: string;
  fieldsetClassName?: string;
  legendClassName?: string;
  labelClassName?: string;
  groupClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
}

export interface BaseFieldComponentProps extends CommonFieldProps {
  field: FormField;
  classNames: FieldClassNames;
}
