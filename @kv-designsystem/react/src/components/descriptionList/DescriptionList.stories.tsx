import { Buildings2Icon } from '@navikt/aksel-icons';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { Card } from '../card/Card';
import { List } from '../list/List';
import { Paragraph } from '../typography/paragraph/Paragraph';
import { DescriptionList } from './DescriptionList';

const meta = {
  component: DescriptionList,
  title: 'Components/DescriptionList',
  parameters: { layout: 'padded' },
  argTypes: {
    'data-size': {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    'data-color': {
      options: [
        'neutral',
        'accent',
        'support-1',
        'support-2',
        'success',
        'warning',
        'danger',
        'info',
      ],
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof DescriptionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    listOrientation: 'vertical',
    pairOrientation: 'horizontal',
  },
  render: (args) => (
    <div style={{ maxWidth: '36rem' }}>
      <DescriptionList {...args}>
        <DescriptionList.Item term="Adresse">Kartverksveien 21, 3507 Hønefoss</DescriptionList.Item>
        <DescriptionList.Item term="Gårdsnummer">38</DescriptionList.Item>
        <DescriptionList.Item term="Bruksnummer">12</DescriptionList.Item>
      </DescriptionList>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const list = canvasElement.querySelector('dl');
    const items = list?.querySelectorAll(':scope > div');
    const firstItem = items?.[0];
    const secondItem = items?.[1];
    const term = firstItem?.querySelector('dt');
    const description = firstItem?.querySelector('dd');
    const host = list?.parentElement?.parentElement;
    if (!list || !firstItem || !secondItem || !term || !description || !host)
      throw new Error('DescriptionList.Item was not rendered');
    await expect(list.hasAttribute('data-size')).toBe(false);
    await expect(list.hasAttribute('data-color')).toBe(false);
    const defaultFontSize = Number.parseFloat(getComputedStyle(list).fontSize);
    const defaultColor = getComputedStyle(list).color;
    const defaultGap = getComputedStyle(list).rowGap;
    list.setAttribute('data-size', 'lg');
    list.setAttribute('data-color', 'accent');
    await expect(Number.parseFloat(getComputedStyle(list).fontSize)).toBeGreaterThan(
      defaultFontSize,
    );
    await expect(getComputedStyle(list).color).toBe(defaultColor);
    await expect(Number.parseFloat(getComputedStyle(list).rowGap)).toBeGreaterThan(
      Number.parseFloat(defaultGap),
    );
    list.removeAttribute('data-size');
    list.removeAttribute('data-color');
    await expect(firstItem.querySelector('dt')?.textContent).toBe('Adresse');
    await expect(firstItem.querySelector('dd')?.textContent).toBe(
      'Kartverksveien 21, 3507 Hønefoss',
    );
    await expect(getComputedStyle(firstItem).display).toBe('grid');
    await expect(description.getBoundingClientRect().x).toBe(
      secondItem.querySelector('dd')?.getBoundingClientRect().x,
    );
    const wideWidth = description.getBoundingClientRect().width;
    const wideHeight = description.getBoundingClientRect().height;
    await expect(wideWidth).toBeGreaterThan(200);
    await expect(
      Math.abs(description.getBoundingClientRect().right - list.getBoundingClientRect().right),
    ).toBeLessThan(1);

    host.style.width = '15rem';
    await expect(description.getBoundingClientRect().width).toBeLessThan(wideWidth);
    await expect(description.getBoundingClientRect().height).toBeGreaterThan(wideHeight);
    await expect(description.getBoundingClientRect().y).toBeGreaterThan(
      term.getBoundingClientRect().y,
    );
    await expect(description.getBoundingClientRect().right).toBeLessThanOrEqual(
      list.getBoundingClientRect().right,
    );
    host.style.removeProperty('width');
  },
};

export const WithinCard: Story = {
  render: () => (
    <Card data-color="support-1" data-size="lg" style={{ maxWidth: '36rem' }}>
      <List.Unordered data-color="accent" data-size="sm">
        <List.Item>
          <Paragraph data-size="sm">Beskrivelse i vanlig liste</Paragraph>
        </List.Item>
      </List.Unordered>
      <DescriptionList data-color="accent" data-size="sm">
        <DescriptionList.Item term="Adresse">
          <Paragraph data-size="sm">Kartverksveien 21, 3507 Hønefoss</Paragraph>
        </DescriptionList.Item>
        <DescriptionList.Item term="Gårdsnummer">38</DescriptionList.Item>
      </DescriptionList>
    </Card>
  ),
  play: async ({ canvasElement }) => {
    const card = canvasElement.querySelector('.ds-card');
    const list = card?.querySelector('dl');
    const regularList = card?.querySelector('ul.ds-list');
    const inside = list?.querySelector('dd > p');
    const regularParagraph = regularList?.querySelector('p');
    if (!card || !list || !regularList || !inside || !regularParagraph)
      throw new Error('DescriptionList and List inside Card were not rendered');

    for (const cardSize of ['sm', 'lg']) {
      card.setAttribute('data-size', cardSize);
      for (const size of ['sm', 'md', 'lg']) {
        list.setAttribute('data-size', size);
        regularList.setAttribute('data-size', size);
        await expect(getComputedStyle(list).fontSize).toBe(getComputedStyle(regularList).fontSize);
        await expect(getComputedStyle(list).getPropertyValue('--ds-size-mode-font-size')).toBe(
          getComputedStyle(regularList).getPropertyValue('--ds-size-mode-font-size'),
        );
        await expect(getComputedStyle(list).color).toBe(getComputedStyle(card).color);
        await expect(getComputedStyle(inside).color).toBe(getComputedStyle(regularParagraph).color);
        await expect(getComputedStyle(inside).fontSize).toBe(
          getComputedStyle(regularParagraph).fontSize,
        );
      }
    }
    card.setAttribute('data-size', 'lg');
    list.setAttribute('data-size', 'sm');
    regularList.setAttribute('data-size', 'sm');
    await expect(getComputedStyle(list).getPropertyValue('--ds-color-background-tinted')).not.toBe(
      getComputedStyle(card).getPropertyValue('--ds-color-background-tinted'),
    );
  },
};

export const Horizontal: Story = {
  args: { listOrientation: 'horizontal', pairOrientation: 'vertical' },
  render: (args) => (
    <DescriptionList {...args}>
      <DescriptionList.Item term="Adresse">Kartverksveien 21, 3507 Hønefoss</DescriptionList.Item>
      <DescriptionList.Item term="Gårdsnummer">38</DescriptionList.Item>
      <DescriptionList.Item term="Bruksnummer">12</DescriptionList.Item>
      <DescriptionList.Item term="Kommunenummer">3305</DescriptionList.Item>
    </DescriptionList>
  ),
  play: async ({ canvasElement }) => {
    const list = canvasElement.querySelector('dl');
    const items = list?.querySelectorAll(':scope > div');
    const item = items?.[0];
    const host = list?.parentElement;
    if (!list || !item || !items || !host) throw new Error('DescriptionList was not rendered');
    await expect(items).toHaveLength(4);
    await expect(list.getAttribute('data-list-orientation')).toBe('horizontal');
    await expect(list.getAttribute('data-pair-orientation')).toBe('vertical');
    await expect(getComputedStyle(list).display).toBe('flex');
    await expect(getComputedStyle(item).display).toBe('grid');
    await expect(items[0].getBoundingClientRect().width).toBeGreaterThan(
      items[1].getBoundingClientRect().width,
    );
    const term = item.querySelector('dt');
    const description = item.querySelector('dd');
    if (!term || !description) throw new Error('DescriptionList term or description is missing');
    await expect(description.getBoundingClientRect().y).toBeGreaterThan(
      term.getBoundingClientRect().y,
    );
    host.style.width = '50rem';
    await expect(items[2].getBoundingClientRect().y).toBe(items[0].getBoundingClientRect().y);
    await expect(items[3].getBoundingClientRect().y).toBe(items[0].getBoundingClientRect().y);
    await expect(
      Math.abs(items[3].getBoundingClientRect().right - list.getBoundingClientRect().right),
    ).toBeLessThan(1);
    host.style.width = '36rem';
    await expect(items[1].getBoundingClientRect().y).toBe(items[0].getBoundingClientRect().y);
    await expect(items[3].getBoundingClientRect().y).toBeGreaterThan(
      items[0].getBoundingClientRect().y,
    );
    await expect(
      Math.abs(items[3].getBoundingClientRect().width - list.getBoundingClientRect().width),
    ).toBeLessThan(1);
    host.style.width = '15rem';
    await expect(getComputedStyle(list).display).toBe('grid');
    await expect(description.getBoundingClientRect().y).toBeGreaterThan(
      term.getBoundingClientRect().y,
    );
    await expect(description.getBoundingClientRect().right).toBeLessThanOrEqual(
      list.getBoundingClientRect().right,
    );
    host.style.width = '100%';
  },
};

export const VerticalPairs: Story = {
  args: { listOrientation: 'vertical', pairOrientation: 'vertical' },
  render: (args) => (
    <DescriptionList {...args}>
      <DescriptionList.Item term="Adresse">Kartverksveien 21, 3507 Hønefoss</DescriptionList.Item>
      <DescriptionList.Item term="Gårdsnummer">38</DescriptionList.Item>
    </DescriptionList>
  ),
  play: async ({ canvasElement }) => {
    const list = canvasElement.querySelector('dl');
    const item = list?.querySelector(':scope > div');
    const term = item?.querySelector('dt');
    const description = item?.querySelector('dd');
    if (!list || !item || !term || !description)
      throw new Error('DescriptionList was not rendered');
    await expect(getComputedStyle(list).display).toBe('grid');
    await expect(description.getBoundingClientRect().y).toBeGreaterThan(
      term.getBoundingClientRect().y,
    );
  },
};

export const HorizontalPairs: Story = {
  args: { listOrientation: 'horizontal', pairOrientation: 'horizontal' },
  render: (args) => (
    <DescriptionList {...args}>
      <DescriptionList.Item term="Adresse">Kartverksveien 21</DescriptionList.Item>
      <DescriptionList.Item term="Gårdsnummer">38</DescriptionList.Item>
      <DescriptionList.Item term="Bruksnummer">12</DescriptionList.Item>
    </DescriptionList>
  ),
  play: async ({ canvasElement }) => {
    const list = canvasElement.querySelector('dl');
    const item = list?.querySelector(':scope > div');
    const term = item?.querySelector('dt');
    const description = item?.querySelector('dd');
    if (!list || !item || !term || !description)
      throw new Error('DescriptionList was not rendered');
    await expect(getComputedStyle(list).display).toBe('flex');
    await expect(getComputedStyle(item).display).toBe('flex');
    await expect(description.getBoundingClientRect().y).toBe(term.getBoundingClientRect().y);
  },
};

export const NarrowHorizontal: Story = {
  args: { listOrientation: 'horizontal', pairOrientation: 'horizontal' },
  render: (args) => (
    <div style={{ width: 'min(100%, 20rem)' }}>
      <DescriptionList {...args}>
        <DescriptionList.Item term="Adresse">Kartverksveien 21</DescriptionList.Item>
        <DescriptionList.Item term="Gårdsnummer">38</DescriptionList.Item>
        <DescriptionList.Item term={<Buildings2Icon role="img" aria-label="Eiendom" />}>
          Kartverksveien 22
        </DescriptionList.Item>
      </DescriptionList>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const list = canvasElement.querySelector('dl');
    const host = list?.parentElement?.parentElement;
    const items = list?.querySelectorAll(':scope > div');
    const firstItem = items?.[0];
    const secondItem = items?.[1];
    const iconItem = items?.[2];
    const firstTerm = firstItem?.querySelector('dt');
    const firstDescription = firstItem?.querySelector('dd');
    const secondDescription = secondItem?.querySelector('dd');
    const iconTerm = iconItem?.querySelector('dt');
    const iconDescription = iconItem?.querySelector('dd');
    if (
      !list ||
      !host ||
      !firstItem ||
      !secondItem ||
      !iconItem ||
      !firstTerm ||
      !firstDescription ||
      !secondDescription ||
      !iconTerm ||
      !iconDescription
    ) {
      throw new Error('DescriptionList narrow example was not rendered');
    }

    await expect(getComputedStyle(firstItem).display).toBe('grid');
    await expect(firstTerm.getBoundingClientRect().y).toBe(
      firstDescription.getBoundingClientRect().y,
    );
    await expect(firstDescription.getBoundingClientRect().x).toBe(
      secondDescription.getBoundingClientRect().x,
    );
    await expect(secondItem.getBoundingClientRect().y).toBeGreaterThan(
      firstItem.getBoundingClientRect().y,
    );
    await expect(iconTerm.getBoundingClientRect().y).toBe(
      iconDescription.getBoundingClientRect().y,
    );
    list.setAttribute('data-column-gap', '6');
    await expect(
      Math.abs(
        firstDescription.getBoundingClientRect().left -
          firstTerm.getBoundingClientRect().right -
          Number.parseFloat(getComputedStyle(list).columnGap),
      ),
    ).toBeLessThan(1);
    list.removeAttribute('data-column-gap');

    host.style.width = '399px';
    await expect(firstDescription.getBoundingClientRect().y).toBe(
      firstTerm.getBoundingClientRect().y,
    );
    host.style.width = '400px';
    await expect(getComputedStyle(list).display).toBe('flex');
    await expect(firstDescription.getBoundingClientRect().y).toBe(
      firstTerm.getBoundingClientRect().y,
    );
    host.style.width = '300px';
    await expect(firstDescription.getBoundingClientRect().y).toBe(
      firstTerm.getBoundingClientRect().y,
    );
    host.style.width = '299px';
    await expect(getComputedStyle(list).display).toBe('grid');
    await expect(firstDescription.getBoundingClientRect().y).toBeGreaterThan(
      firstTerm.getBoundingClientRect().y,
    );
    await expect(iconTerm.getBoundingClientRect().y).toBe(
      iconDescription.getBoundingClientRect().y,
    );
    host.style.width = 'min(100%, 20rem)';
  },
};

export const CustomWrapPoints: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <div style={{ width: 'min(100%, 250px)' }}>
        <DescriptionList listOrientation="horizontal" listWrapAt={200}>
          <DescriptionList.Item term="Adresse">
            Kartverksveien 21, 3507 Hønefoss. Opplysninger om eiendommen kan være omfattende.
          </DescriptionList.Item>
          <DescriptionList.Item term="Gårdsnummer">38</DescriptionList.Item>
        </DescriptionList>
      </div>
      <div style={{ width: 'min(100%, 450px)' }}>
        <DescriptionList listOrientation="horizontal" pairWrapAt={500}>
          <DescriptionList.Item term="Adresse">Kartverksveien 21</DescriptionList.Item>
          <DescriptionList.Item term="Gårdsnummer">38</DescriptionList.Item>
        </DescriptionList>
      </div>
      <div style={{ width: 'min(100%, 450px)' }}>
        <DescriptionList listOrientation="horizontal" listWrapAt={500}>
          <DescriptionList.Item term="Adresse">Kartverksveien 21</DescriptionList.Item>
          <DescriptionList.Item term="Gårdsnummer">38</DescriptionList.Item>
        </DescriptionList>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const lists = canvasElement.querySelectorAll('dl');
    const [earlyPair, earlyList, latePair] = Array.from(lists);
    if (!earlyPair || !earlyList || !latePair)
      throw new Error('DescriptionList wrap examples were not rendered');

    const check = async (
      list: HTMLDListElement,
      width: number,
      layout: string,
      stacked: boolean,
    ) => {
      const host = list.parentElement?.parentElement;
      const term = list.querySelector('dt');
      const description = list.querySelector('dd');
      if (!host || !term || !description) throw new Error('DescriptionList pair is missing');
      host.style.width = `${width}px`;
      await expect(getComputedStyle(list).display).toBe(layout);
      if (stacked) {
        await expect(description.getBoundingClientRect().y).toBeGreaterThan(
          term.getBoundingClientRect().y,
        );
      } else {
        await expect(description.getBoundingClientRect().y).toBe(term.getBoundingClientRect().y);
      }
    };

    await expect(earlyPair.dataset.listWrapAt).toBe('200');
    await expect(earlyPair.dataset.pairWrapAt).toBe('300');
    await check(earlyPair, 320, 'flex', false);
    await check(earlyPair, 250, 'flex', true);
    await expect(earlyPair.querySelector('dd')?.getBoundingClientRect().height).toBeGreaterThan(40);
    await check(earlyPair, 190, 'grid', true);

    await expect(earlyList.dataset.listWrapAt).toBe('400');
    await expect(earlyList.dataset.pairWrapAt).toBe('500');
    await check(earlyList, 550, 'flex', false);
    await check(earlyList, 450, 'flex', true);
    await check(earlyList, 350, 'grid', true);

    await expect(latePair.dataset.listWrapAt).toBe('500');
    await expect(latePair.dataset.pairWrapAt).toBe('300');
    await check(latePair, 550, 'flex', false);
    await check(latePair, 450, 'grid', false);
    await check(latePair, 250, 'grid', true);
    for (const [index, list] of Array.from(lists).entries()) {
      const host = list.parentElement?.parentElement;
      if (host) host.style.width = `min(100%, ${index === 0 ? 250 : 450}px)`;
    }
  },
};

export const WithIcon: Story = {
  args: { listOrientation: 'horizontal', pairOrientation: 'vertical', 'data-color': 'accent' },
  render: (args) => (
    <DescriptionList {...args} style={{ maxWidth: '36rem' }}>
      <DescriptionList.Item term={<Buildings2Icon role="img" aria-label="Eiendom" />}>
        <Paragraph>
          Kartverksveien 21 har flere registrerte bygninger og tilhører samme eiendom.
        </Paragraph>
      </DescriptionList.Item>
      <DescriptionList.Item term={<Buildings2Icon role="img" aria-label="Eiendom" />}>
        <Paragraph>Kartverksveien 22</Paragraph>
      </DescriptionList.Item>
    </DescriptionList>
  ),
  play: async ({ canvasElement }) => {
    const list = canvasElement.querySelector('dl');
    const items = list?.querySelectorAll(':scope > div');
    if (!list || !items) throw new Error('DescriptionList icons were not rendered');
    await expect(items).toHaveLength(2);
    for (const [index, item] of Array.from(items).entries()) {
      await expect(item.hasAttribute('data-variant')).toBe(false);
      await expect(item.querySelector('dt > svg')).not.toBeNull();
      const term = item.querySelector('dt');
      const description = item.querySelector('dd');
      const icon = term?.querySelector('svg');
      const paragraph = description?.querySelector('p');
      if (!term || !description || !icon || !paragraph)
        throw new Error('DescriptionList icon pair is missing');
      await expect(getComputedStyle(icon).color).toBe(getComputedStyle(paragraph).color);
      await expect(getComputedStyle(item).display).toBe('flex');
      await expect(getComputedStyle(item).alignItems).toBe('start');
      await expect(icon.getBoundingClientRect().width).toBeCloseTo(
        Number.parseFloat(getComputedStyle(paragraph).lineHeight),
        0,
      );
      await expect(icon.getBoundingClientRect().height).toBe(icon.getBoundingClientRect().width);
      await expect(term.getBoundingClientRect().width).toBe(icon.getBoundingClientRect().width);
      await expect(term.getBoundingClientRect().top).toBe(description.getBoundingClientRect().top);
      if (index === 0) {
        await expect(description.getBoundingClientRect().height).toBeGreaterThan(
          term.getBoundingClientRect().height,
        );
      }
    }
    const icon = items[0]?.querySelector('svg');
    if (!icon) throw new Error('DescriptionList icon is missing');
    const iconColor = getComputedStyle(icon).color;
    list.setAttribute('data-color', 'danger');
    await expect(getComputedStyle(icon).color).toBe(iconColor);
    list.setAttribute('data-color', 'accent');
  },
};

export const WithCircle: Story = {
  args: { listOrientation: 'horizontal', pairOrientation: 'vertical', 'data-color': 'accent' },
  render: (args) => (
    <DescriptionList {...args} style={{ maxWidth: '36rem' }}>
      <DescriptionList.Item
        term={<Buildings2Icon role="img" aria-label="Eiendom" />}
        variant="circle"
      >
        <Paragraph data-size="sm">Kartverksveien 21</Paragraph>
      </DescriptionList.Item>
      <DescriptionList.Item
        term={<Buildings2Icon role="img" aria-label="Eiendom" />}
        variant="circle"
      >
        <Paragraph data-size="sm">
          Kartverksveien 22 har flere registrerte bygninger og tilhører samme eiendom.
        </Paragraph>
      </DescriptionList.Item>
    </DescriptionList>
  ),
  play: async ({ canvasElement }) => {
    const list = canvasElement.querySelector('dl');
    const items = list?.querySelectorAll(':scope > div');
    if (!list || !items) throw new Error('DescriptionList circle icons were not rendered');
    await expect(items).toHaveLength(2);
    for (const [index, item] of Array.from(items).entries()) {
      const term = item.querySelector('dt');
      const description = item.querySelector('dd');
      if (!term || !description) throw new Error('DescriptionList circle pair is missing');
      await expect(item.getAttribute('data-variant')).toBe('circle');
      await expect(getComputedStyle(item).display).toBe('flex');
      await expect(getComputedStyle(item).alignItems).toBe('center');
      if (index === 1) {
        await expect(description.getBoundingClientRect().height).toBeGreaterThan(
          term.getBoundingClientRect().height,
        );
        await expect(
          Math.abs(
            (term.getBoundingClientRect().top + term.getBoundingClientRect().bottom) / 2 -
              (description.getBoundingClientRect().top +
                description.getBoundingClientRect().bottom) /
                2,
          ),
        ).toBeLessThan(1);
      }
    }
    const circle = items[0]?.querySelector('dt');
    const description = items[0]?.querySelector('dd');
    if (!circle || !description) throw new Error('DescriptionList circle pair is missing');
    const background = getComputedStyle(circle).backgroundColor;
    const iconColor = getComputedStyle(circle).color;
    const textColor = getComputedStyle(description).color;
    list.setAttribute('data-color', 'danger');
    await expect(getComputedStyle(circle).backgroundColor).not.toBe(background);
    await expect(getComputedStyle(circle).color).not.toBe(iconColor);
    await expect(getComputedStyle(description).color).toBe(textColor);
    list.setAttribute('data-color', 'accent');
  },
};

export const CircleWithVerticalList: Story = {
  render: () => (
    <DescriptionList style={{ maxWidth: '25rem' }}>
      <DescriptionList.Item
        term={<Buildings2Icon role="img" aria-label="Eiendom" />}
        variant="circle"
      >
        Kartverksveien 21
      </DescriptionList.Item>
      <DescriptionList.Item
        term={<Buildings2Icon role="img" aria-label="Eiendom" />}
        variant="circle"
      >
        <Paragraph data-size="sm">
          Kartverksveien 22 har flere registrerte bygninger og tilhører samme eiendom.
        </Paragraph>
      </DescriptionList.Item>
    </DescriptionList>
  ),
  play: async ({ canvasElement }) => {
    const list = canvasElement.querySelector('dl');
    const container = list?.parentElement;
    const item = list?.querySelector(':scope > div[data-variant="circle"]:last-child');
    const term = item?.querySelector('dt');
    const description = item?.querySelector('dd');
    if (!list || !container || !item || !term || !description)
      throw new Error('DescriptionList circle pair was not rendered');
    await expect(list.querySelectorAll('div[data-variant="circle"]')).toHaveLength(2);
    await expect(list.hasAttribute('data-color')).toBe(false);
    const background = getComputedStyle(term).backgroundColor;
    const iconColor = getComputedStyle(term).color;
    term.style.backgroundColor = 'var(--ds-color-neutral-background-tinted)';
    term.style.color = 'var(--ds-color-neutral-text-default)';
    await expect(getComputedStyle(term).backgroundColor).toBe(background);
    await expect(getComputedStyle(term).color).toBe(iconColor);
    term.style.removeProperty('background-color');
    term.style.removeProperty('color');
    container.setAttribute('data-color', 'danger');
    await expect(getComputedStyle(term).backgroundColor).toBe(background);
    await expect(getComputedStyle(term).color).toBe(iconColor);
    container.removeAttribute('data-color');

    const checkCenter = async (display: string) => {
      await expect(getComputedStyle(item).display).toBe(display);
      await expect(getComputedStyle(item).alignItems).toBe('center');
      await expect(description.getBoundingClientRect().height).toBeGreaterThan(
        term.getBoundingClientRect().height,
      );
      await expect(
        Math.abs(
          (term.getBoundingClientRect().top + term.getBoundingClientRect().bottom) / 2 -
            (description.getBoundingClientRect().top + description.getBoundingClientRect().bottom) /
              2,
        ),
      ).toBeLessThan(1);
    };

    await checkCenter('grid');
    container.style.maxWidth = '250px';
    await checkCenter('flex');
    container.style.maxWidth = '25rem';
  },
};

export const CustomGaps: Story = {
  render: () => (
    <DescriptionList gap={6} rowGap={8} columnGap={3}>
      <DescriptionList.Item term="Adresse" gap={4} rowGap={1} columnGap={2}>
        Kartverksveien 21
      </DescriptionList.Item>
      <DescriptionList.Item term="Gårdsnummer">38</DescriptionList.Item>
    </DescriptionList>
  ),
  play: async ({ canvasElement }) => {
    const list = canvasElement.querySelector('dl');
    const items = list?.querySelectorAll(':scope > div');
    const item = items?.[0];
    const inheritedItem = items?.[1];
    const overriddenTerm = item?.querySelector('dt');
    const overriddenDescription = item?.querySelector('dd');
    const term = inheritedItem?.querySelector('dt');
    const description = inheritedItem?.querySelector('dd');
    if (
      !list ||
      !item ||
      !inheritedItem ||
      !term ||
      !description ||
      !overriddenTerm ||
      !overriddenDescription
    )
      throw new Error('DescriptionList with gaps was not rendered');
    await expect(list.getAttribute('data-gap')).toBe('6');
    await expect(list.getAttribute('data-row-gap')).toBe('8');
    await expect(list.getAttribute('data-column-gap')).toBe('3');
    await expect(item.getAttribute('data-gap')).toBe('4');
    await expect(item.getAttribute('data-row-gap')).toBe('1');
    await expect(item.getAttribute('data-column-gap')).toBe('2');
    await expect(getComputedStyle(list).columnGap).not.toBe(getComputedStyle(list).rowGap);
    await expect(getComputedStyle(item).columnGap).not.toBe(getComputedStyle(item).rowGap);
    await expect(getComputedStyle(inheritedItem).columnGap).toBe(getComputedStyle(list).columnGap);
    await expect(
      Math.abs(
        overriddenDescription.getBoundingClientRect().left -
          overriddenTerm.getBoundingClientRect().right -
          Number.parseFloat(getComputedStyle(item).columnGap),
      ),
    ).toBeLessThan(1);
    const distance = () =>
      description.getBoundingClientRect().left - term.getBoundingClientRect().right;
    await expect(
      Math.abs(distance() - Number.parseFloat(getComputedStyle(list).columnGap)),
    ).toBeLessThan(1);
    list.setAttribute('data-column-gap', '0');
    await expect(Math.abs(distance())).toBeLessThan(1);
    list.setAttribute('data-column-gap', '3');
  },
};
