import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToggleGroup } from './ToggleGroup';
import { Tooltip } from '../tooltip/Tooltip';
import { 
  CheckmarkCircleIcon,
  ExclamationmarkTriangleIcon,
  XMarkOctagonIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon 
} from '@navikt/aksel-icons';

const meta = {
  component: ToggleGroup,
  parameters: { layout: 'centered' },
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
  )
};

export const TextAndIcons: Story = {
  render: () => (
    <ToggleGroup defaultValue='aktiv'>
      <ToggleGroup.Item value='aktiv'>
        <CheckmarkCircleIcon aria-hidden />
        Aktiv
      </ToggleGroup.Item>
      <ToggleGroup.Item value='advarsel'>
        <ExclamationmarkTriangleIcon aria-hidden />
        Advarsel
      </ToggleGroup.Item>
      <ToggleGroup.Item value='kritisk'>
        <XMarkOctagonIcon aria-hidden />
        Kritisk
      </ToggleGroup.Item>
    </ToggleGroup>
  )
};

export const OnlyIcons: Story = {
  render: () => (
    <ToggleGroup data-toggle-group='Tekstjustering' defaultValue='option-1'>
      <Tooltip content='Venstrestilt'>
        <ToggleGroup.Item value='option-1'>
          <AlignLeftIcon aria-hidden />
        </ToggleGroup.Item>
      </Tooltip>
      <Tooltip content='Midtstilt'>
        <ToggleGroup.Item value='option-2'>
          <AlignCenterIcon aria-hidden />
        </ToggleGroup.Item>
      </Tooltip>
      <Tooltip content='Høyrestilt'>
        <ToggleGroup.Item value='option-3'>
          <AlignRightIcon aria-hidden />
        </ToggleGroup.Item>
      </Tooltip>
    </ToggleGroup>
  )
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
  )
};
