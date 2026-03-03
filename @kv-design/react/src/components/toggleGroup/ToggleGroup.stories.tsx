import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToggleGroup } from './ToggleGroup';
import { Tooltip } from '../tooltip/Tooltip';

const meta = {
  component: ToggleGroup,
  parameters: {layout: 'centered'},
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  render: () => (
    <ToggleGroup defaultValue='innboks'>
      <ToggleGroup.Item value='innboks'>Innboks</ToggleGroup.Item>
      <ToggleGroup.Item value='utkast'>Utkast</ToggleGroup.Item>
      <ToggleGroup.Item value='arkiv'>Arkiv</ToggleGroup.Item>
      <ToggleGroup.Item value='sendt'>Sendt</ToggleGroup.Item>
    </ToggleGroup>
  ),
};

// TODO: add icons
export const TextAndIcons: Story = {
  render: () => (
    <ToggleGroup defaultValue="aktiv">
      <ToggleGroup.Item value="aktiv">
        {/* <CheckmarkCircleIcon aria-hidden /> */}
        [ICON]Aktiv
      </ToggleGroup.Item>
      <ToggleGroup.Item value="advarsel">
        {/* <ExclamationmarkTriangleIcon aria-hidden /> */}
        [ICON]Advarsel
      </ToggleGroup.Item>
      <ToggleGroup.Item value="kritisk">
        {/* <XMarkOctagonIcon aria-hidden /> */}
        [ICON]Kritisk
      </ToggleGroup.Item>
    </ToggleGroup>
  ),
};


// TODO: add icons
export const OnlyIcons: Story = {
  render: () => (
    <ToggleGroup data-toggle-group='Tekstjustering' defaultValue='option-1'>
      <Tooltip content='Venstrestilt'>
        <ToggleGroup.Item value='option-1'>
          {/* <AlignLeftIcon aria-hidden /> */}
          ICON
        </ToggleGroup.Item>
      </Tooltip>
      <Tooltip content='Midtstilt'>
        <ToggleGroup.Item value='option-2'>
          {/* <AlignCenterIcon aria-hidden /> */}
          ICON
        </ToggleGroup.Item>
      </Tooltip>
      <Tooltip content='Høyrestilt'>
        <ToggleGroup.Item value='option-3'>
          {/* <AlignRightIcon aria-hidden /> */}
          ICON
        </ToggleGroup.Item>
      </Tooltip>
    </ToggleGroup>
  ),
};

export const Secondary: Story = {
  render: () => (
    <ToggleGroup
      data-toggle-group='Filter'
      defaultValue='innboks'
      variant='secondary'
    >
      <ToggleGroup.Item value='innboks'>Innboks</ToggleGroup.Item>
      <ToggleGroup.Item value='utkast'>Utkast</ToggleGroup.Item>
      <ToggleGroup.Item value='arkiv'>Arkiv</ToggleGroup.Item>
      <ToggleGroup.Item value='sendt'>Sendt</ToggleGroup.Item>
    </ToggleGroup>
  ),
};
