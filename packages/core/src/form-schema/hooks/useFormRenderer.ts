import { useState, useMemo, useCallback, useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import type { Control } from 'react-hook-form';

import type { FormSchema, FieldGroup } from '../types';
import { getFieldsByGroup, getVisibleGroups } from '../core';

export interface UseFormRendererProps {
  schema: FormSchema;
  control: Control<any>;
}

export interface UseFormRendererReturn {
  groupedFields: Record<string, any[]>;
  visibleGroups: FieldGroup[];
  formValues: any;
  collapsedGroups: Set<string>;
  toggleCollapse: (groupId: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  expandedGroups: Set<string>;
  toggleAccordion: (groupId: string) => void;
}

export const useFormRenderer = ({
  schema,
  control,
}: UseFormRendererProps): UseFormRendererReturn => {
  const formValues = useWatch({ control });

  const groupedFields = useMemo(
    () => getFieldsByGroup(schema, formValues || {}),
    [schema, formValues],
  );

  const visibleGroups = useMemo(
    () =>
      getVisibleGroups(schema, formValues || {}).sort((a, b) => (a.order || 0) - (b.order || 0)),
    [schema, formValues],
  );

  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(
    () =>
      new Set(
        schema.groups
          .filter((group) => group.collapsible && group.collapsed)
          .map((group) => group.id),
      ),
  );

  const [activeTab, setActiveTab] = useState<string>(() => visibleGroups[0]?.id || '');

  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    () => new Set(schema.groups.filter((group) => !group.collapsed).map((group) => group.id)),
  );

  const toggleCollapse = useCallback((groupId: string) => {
    setCollapsedGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(groupId)) {
        newSet.delete(groupId);
      } else {
        newSet.add(groupId);
      }
      return newSet;
    });
  }, []);

  const toggleAccordion = useCallback((groupId: string) => {
    setExpandedGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(groupId)) {
        newSet.delete(groupId);
      } else {
        newSet.add(groupId);
      }
      return newSet;
    });
  }, []);

  useEffect(() => {
    if (schema.settings?.groupLayout === 'tabs') {
      const firstVisibleGroup = visibleGroups[0];
      if (firstVisibleGroup && !visibleGroups.find((g) => g.id === activeTab)) {
        setActiveTab(firstVisibleGroup.id);
      }
    }
  }, [visibleGroups, activeTab, schema.settings?.groupLayout]);

  return {
    groupedFields,
    visibleGroups,
    formValues,
    collapsedGroups,
    toggleCollapse,
    activeTab,
    setActiveTab,
    expandedGroups,
    toggleAccordion,
  };
};
