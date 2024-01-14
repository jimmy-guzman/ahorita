import { t } from 'elysia';

export const DateTime = t
  .Transform(
    t.Date({
      description: 'Date as a string value in ISO format',
      examples: 'sss',
    })
  )
  .Decode((value) => value.toISOString())
  .Encode((value) => new Date(value));
