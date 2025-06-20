import { describe, it, expect } from 'vitest';
import * as z from 'zod';
import { generateZodSchema } from '../src/lib/zodGenerator';
import type { FormSchema } from '../src/types/schema';

describe('generateZodSchema', () => {
  it('text form 유효성 검사를 통과한다.', () => {
    const schema: FormSchema = [
      { type: 'text', name: 'title', label: '제목', required: true, minLength: 3, maxLength: 5 },
    ];
    const zodSchema = generateZodSchema(schema);

    expect(zodSchema.safeParse({ title: '' }).success).toBe(false);

    const res2 = zodSchema.safeParse({ title: 'ab' });
    expect(res2.success).toBe(false);
    expect(res2.error!.format().title?._errors[0]).toContain('최소 3자');

    expect(zodSchema.safeParse({ title: 'abcdef' }).success).toBe(false);
    expect(zodSchema.safeParse({ title: 'test' }).success).toBe(true);
  });

  it('number form 유효성 검사를 통과한다.', () => {
    const schema: FormSchema = [
      { type: 'number', name: 'age', label: '나이', min: 10, max: 20, integer: true, step: 2 },
    ];
    const s = generateZodSchema(schema);

    expect(s.safeParse({ age: 9 }).success).toBe(false);
    expect(s.safeParse({ age: 21 }).success).toBe(false);
    expect(s.safeParse({ age: 11 }).success).toBe(false);
    expect(s.safeParse({ age: 14 }).success).toBe(true);
  });

  it('checkbox form 유효성 검사를 통과한다.', () => {
    const schema: FormSchema = [
      {
        type: 'checkbox',
        name: 'agree',
        label: '약관',
        required: true,
        minSelected: 2,
        options: [
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
          { label: 'C', value: 'c' },
        ],
      },
    ];
    const s = generateZodSchema(schema);

    expect(s.safeParse({ agree: [] }).success).toBe(false);
    expect(s.safeParse({ agree: ['a'] }).success).toBe(false);
    expect(s.safeParse({ agree: ['a', 'b'] }).success).toBe(true);
  });

  it('custom form 유효성 검사를 통과한다.', () => {
    const base: FormSchema = [{ type: 'text', name: 'nickname', label: '닉네임' }];

    const custom = z.object({
      nickname: z.string().min(5, '5글자 이상'),
    });

    const s = generateZodSchema(base, custom);

    expect(s.safeParse({ nickname: 'foo' }).success).toBe(false);
    expect(s.safeParse({ nickname: 'foobar' }).success).toBe(true);
  });
});
