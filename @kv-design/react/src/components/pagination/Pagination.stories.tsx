import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination } from './Pagination';

const meta = {
  component: Pagination,
  parameters: {layout: 'centered'},
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  args: {
    children: 'Pagination',
  },
  render: (args) => (
    <Pagination>
      <Pagination.List>
        <Pagination.Item>
          <Pagination.Button aria-label='Forrige side' data-variant='tertiary'>
            Forrige
          </Pagination.Button>
        </Pagination.Item>

        <Pagination.Item>
          <Pagination.Button aria-label='Side 1' data-variant='tertiary'>
            1
          </Pagination.Button>
        </Pagination.Item>

        <Pagination.Item>
          <Pagination.Button aria-label='Side 2' data-variant='primary'>
            2
          </Pagination.Button>
        </Pagination.Item>

        <Pagination.Item />

        <Pagination.Item>
          <Pagination.Button aria-label='Side 9' data-variant='tertiary'>
            9
          </Pagination.Button>
        </Pagination.Item>

        <Pagination.Item>
          <Pagination.Button aria-label='Side 10' data-variant='tertiary'>
            10
          </Pagination.Button>
        </Pagination.Item>

        <Pagination.Item>
          <Pagination.Button aria-label='Neste side' data-variant='tertiary'>
            Neste
          </Pagination.Button>
        </Pagination.Item>
      </Pagination.List>
    </Pagination>
  ),
};
