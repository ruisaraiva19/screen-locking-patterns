import { it, expect } from 'vitest'
import { countPatternsFrom } from './patterns'

it('returns 0 for invalid lengths', () => {
  expect(countPatternsFrom(1, 0)).toBe(0)
  expect(countPatternsFrom(1, 10)).toBe(0)
})

it('returns 1 when the length is 1', () => {
  expect(countPatternsFrom(2, 1)).toBe(1)
})

it('returns 5 when starting from 3 and the length is 2', () => {
  expect(countPatternsFrom(3, 2)).toBe(5)
})

it('returns 37 when starting from 4 and the length is 3', () => {
  expect(countPatternsFrom(4, 3)).toBe(37)
})

it('returns 256 when starting from 5 and the length is 4', () => {
  expect(countPatternsFrom(5, 4)).toBe(256)
})

it('returns 23280 when starting from 5 and the length is 8', () => {
  expect(countPatternsFrom(5, 8)).toBe(23280)
})
