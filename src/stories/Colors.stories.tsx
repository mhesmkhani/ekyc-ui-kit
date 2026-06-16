import type { Meta, StoryObj } from '@storybook/react';

import { palette } from '../colors/palette';

function getReadableTextColor(hex: string) {
  const cleanHex = hex.replace('#', '');
  const red = Number.parseInt(cleanHex.slice(0, 2), 16);
  const green = Number.parseInt(cleanHex.slice(2, 4), 16);
  const blue = Number.parseInt(cleanHex.slice(4, 6), 16);
  const brightness = (red * 299 + green * 587 + blue * 114) / 1000;

  return brightness > 150 ? '#161616' : '#FFFFFF';
}

function ColorSwatch({ colorName, shade, value }: { colorName: string; shade: string; value: string }) {
  const textColor = getReadableTextColor(value);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex h-28 items-end p-3" style={{ backgroundColor: value }}>
        <span
          className="rounded-full px-2.5 py-1 font-mono text-xs font-semibold"
          style={{
            color: textColor,
            backgroundColor: textColor === '#FFFFFF' ? 'rgba(0,0,0,0.22)' : 'rgba(255,255,255,0.68)',
          }}
        >
          {shade}
        </span>
      </div>

      <div className="space-y-1 p-3 text-left ltr:text-left rtl:text-right">
        <div className="font-mono text-xs font-semibold text-dark-900">{colorName}-{shade}</div>
        <div className="font-mono text-xs text-gray-500">{value}</div>
        <div className="font-mono text-xs text-gray-400">bg-{colorName}-{shade}</div>
      </div>
    </div>
  );
}

function ColorsPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8 text-dark-900">
      <div className="mx-auto max-w-7xl space-y-10">
        <header className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary-600">Design tokens</p>
          <h1 className="text-3xl font-bold">Color Palette</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600">
            Central palette used by Tailwind and the UI components. Each swatch shows the token name, hex value, and Tailwind class name.
          </p>
        </header>

        {Object.entries(palette).map(([colorName, shades]) => (
          <section key={colorName} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-200">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold capitalize text-dark-900">{colorName}</h2>
                <p className="mt-1 text-sm text-gray-500">Tailwind prefix: bg-{colorName}-*</p>
              </div>
              <div className="font-mono text-xs text-gray-500">{Object.keys(shades).length} shades</div>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-10">
              {Object.entries(shades).map(([shade, value]) => (
                <ColorSwatch key={`${colorName}-${shade}`} colorName={colorName} shade={shade} value={value} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

const meta: Meta<typeof ColorsPage> = {
  title: 'Design System/Colors',
  component: ColorsPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A visual reference for the EKYC design-system color tokens.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ColorsPage>;

export const Palette: Story = {};
