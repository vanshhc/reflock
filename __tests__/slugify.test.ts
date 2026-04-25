import { describe, it, expect } from 'vitest'
import { slugify } from '../lib/slugify'

describe('slugify', () => {
  it('lowercases and replaces spaces with dashes', () => {
    expect(slugify('Hello World')).toBe('hello-world')
  })

  it('strips special characters', () => {
    expect(slugify('React & Next.js!')).toBe('react-nextjs')
  })

  it('collapses multiple spaces and dashes', () => {
    expect(slugify('too   many   spaces')).toBe('too-many-spaces')
  })

  it('trims leading/trailing whitespace', () => {
    expect(slugify('  padded  ')).toBe('padded')
  })

  it('handles empty string', () => {
    expect(slugify('')).toBe('')
  })
})
