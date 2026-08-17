import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Pagination } from '../../../components/pagination/Pagination';
import {
  type UsePaginationProps,
  usePagination,
} from './usePagination';

const meta: Meta<UsePaginationProps> = {
  title: 'Hooks/usePagination',
  tags: ['alpha'],
  parameters: {
    docs: {
      source: {
        type: 'code', // Vis koden som tilhører hver Story direkte (userialisert)

        // Fjern det wrappende "render: (args, context) => {" i preview-koden, så bare selve eksempelet vises.
        transform: (code: string) => {
          if (!code.includes('=>')) return code;

          return code
            .replace(/^[\s\S]*?=>\s*\{/, '') // fjern "{ render: (args, context) => {"
            .replace(/\}\s*\}\s*;?\s*$/, '') // fjern de to avsluttende }
            .replace(/^ {4}/gm, '') // dedent 2 nivåer
            .replace('return', '')
            .trim();
        },
      }
    }
  },
  argTypes: {
    currentPage: {
      control: {
        type: 'number',
      },
      defaultValue: 1,
      description: 'The current page number',
      type: { name: 'number' },
    },
    totalPages: {
      control: {
        type: 'number',
      },
      defaultValue: 1,
      description: 'The total number of pages',
      type: { name: 'number' },
    },
    showPages: {
      control: {
        type: 'number',
      },
      defaultValue: 7,
      description: 'The maximum number of pages to show',
      type: { name: 'number' },
    },
    setCurrentPage: {
      description: 'Callback to set the current page',
      type: { name: 'function' },
    },
    onChange: {
      description: 'Callback when the page changes',
      type: { name: 'function' },
    },
  },
};

export default meta;
type Story = StoryObj<UsePaginationProps>;

export const Preview: Story = {
  render: (__args) => {
    const [currentPage, setCurrentPage] = useState(4);
    const { pages, nextButtonProps, prevButtonProps } = usePagination({
      currentPage: currentPage,
      totalPages: 10,
      showPages: 7,
      setCurrentPage,
    });

    return (
      <Pagination aria-label='Sidenavigering'>
        <Pagination.List>
          <Pagination.Item>
            <Pagination.Button aria-label='Forrige side' {...prevButtonProps}>
              Forrige
            </Pagination.Button>
          </Pagination.Item>
          {pages.map(({ page, itemKey, buttonProps }) => (
            <Pagination.Item key={itemKey}>
              {typeof page === 'number' && (
                <Pagination.Button aria-label={`Side ${page}`} {...buttonProps}>
                  {page}
                </Pagination.Button>
              )}
            </Pagination.Item>
          ))}
          <Pagination.Item>
            <Pagination.Button aria-label='Neste side' {...nextButtonProps}>
              Neste
            </Pagination.Button>
          </Pagination.Item>
        </Pagination.List>
      </Pagination>
    );
  },
};
