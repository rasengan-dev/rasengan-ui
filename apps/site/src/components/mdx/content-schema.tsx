import { zodToJsonSchema } from 'zod-to-json-schema';
import { getBlock } from '@/blocks-catalogue';

interface JsonSchema {
  type?: string | string[];
  description?: string;
  properties?: Record<string, JsonSchema>;
  required?: string[];
  items?: JsonSchema;
  enum?: unknown[];
  default?: unknown;
  minLength?: number;
  maxLength?: number;
  minItems?: number;
  maxItems?: number;
  minimum?: number;
  maximum?: number;
  format?: string;
  pattern?: string;
}

interface Row {
  path: string;
  type: string;
  required: boolean;
  limits: string;
  description?: string;
}

function typeOf(schema: JsonSchema): string {
  if (schema.enum) return schema.enum.map((value) => JSON.stringify(value)).join(' | ');
  if (schema.type === 'array') return `${schema.items ? typeOf(schema.items) : 'unknown'}[]`;
  return Array.isArray(schema.type) ? schema.type.join(' | ') : (schema.type ?? 'unknown');
}

function limitsOf(schema: JsonSchema): string {
  const range = (min?: number, max?: number, unit = '') =>
    min !== undefined && max !== undefined ? `${min}–${max}${unit}` : min !== undefined ? `≥ ${min}${unit}` : max !== undefined ? `≤ ${max}${unit}` : '';
  return [
    // A bare min(1) only says "not empty": no limit worth a column.
    schema.minLength === 1 && schema.maxLength === undefined ? '' : range(schema.minLength, schema.maxLength, ' chars'),
    range(schema.minItems, schema.maxItems, ' items'),
    range(schema.minimum, schema.maximum),
    schema.format ?? '',
    schema.default !== undefined ? `default ${JSON.stringify(schema.default)}` : '',
  ]
    .filter(Boolean)
    .join(', ');
}

/** The fields, depth first: `primary.label`, `items[].name`. */
function rows(schema: JsonSchema, prefix = '', required = true): Row[] {
  const object = schema.type === 'array' ? schema.items : schema;
  const self: Row[] = prefix
    ? [{ path: prefix, type: object?.properties ? (schema.type === 'array' ? 'object[]' : 'object') : typeOf(schema), required, limits: limitsOf(schema), description: schema.description }]
    : [];
  if (!object?.properties) return self;
  const base = schema.type === 'array' ? `${prefix}[]` : prefix;
  return [
    ...self,
    ...Object.entries(object.properties).flatMap(([key, child]) =>
      rows(child, base ? `${base}.${key}` : key, (object.required ?? []).includes(key)),
    ),
  ];
}

/**
 * `<ContentSchema name="cta-banner" />`: the block's content fields, read from its zod schema (the same JSON Schema the
 * MCP server gives an agent): path, type, required, limits, and the writing guidance.
 */
export function ContentSchema({ name }: { name: string }) {
  const { schema } = getBlock(name);
  if (!schema) return null;
  const json = zodToJsonSchema(schema, { $refStrategy: 'none' }) as JsonSchema;
  return (
    <div className="my-6 w-full overflow-x-auto rounded-lg border-village">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {['Field', 'Type', 'Limits', 'Guidance'].map((heading) => (
              <th key={heading} className="min-w-28 border-b-(length:--border-width) bg-muted px-4 py-2.5 text-start font-semibold text-foreground">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows(json).map((row) => (
            <tr key={row.path}>
              <td className="border-b-(length:--border-width) px-4 py-2.5 align-top whitespace-nowrap">
                <code className="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">{row.path}</code>
                {!row.required && <span className="ms-1.5 text-xs text-muted-foreground">optional</span>}
              </td>
              <td className="border-b-(length:--border-width) px-4 py-2.5 align-top font-mono text-[0.85em] text-muted-foreground">{row.type}</td>
              <td className="border-b-(length:--border-width) px-4 py-2.5 align-top text-muted-foreground">{row.limits}</td>
              <td className="min-w-60 border-b-(length:--border-width) px-4 py-2.5 align-top text-muted-foreground">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
