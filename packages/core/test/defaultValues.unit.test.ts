import { describe, it, expect } from 'vitest';
import { generateDefaultValues } from '../src/lib/zodGenerator';
import type { FormSchema } from '../src/types/schema';

describe('generateDefaultValues', () => {
  it('defaultValue가 주어지지 않았을 때 알맞은 defaultValue를 생성해야 한다.', () => {
    const schema: FormSchema = [
      { type: 'text', name: 'title', label: '제목' },
      { type: 'number', name: 'price', label: '가격' },
      { type: 'checkbox', name: 'tos', label: '약관' },
      {
        type: 'checkbox',
        name: 'tags',
        label: '태그',
        options: [
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ],
      },
      {
        type: 'select',
        name: 'country',
        label: '국가',
        options: [
          { label: '한국', value: 'kr' },
          { label: '미국', value: 'us' },
        ],
      },
    ];

    const defaults = generateDefaultValues(schema);

    expect(defaults).toEqual({
      title: '',
      price: undefined,
      tos: false,
      tags: [],
      country: '',
    });
  });

  it('defaultValue가 주어졌을 때 주어진 defaultValue를 return 한다.', () => {
    const schema: FormSchema = [
      { type: 'text', name: 'email', label: '이메일', defaultValue: 'test@site.com' },
    ];
    const defaults = generateDefaultValues(schema);
    expect(defaults.email).toBe('test@site.com');
  });
});
