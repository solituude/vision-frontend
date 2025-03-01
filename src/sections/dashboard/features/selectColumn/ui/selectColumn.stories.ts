import type {Meta, StoryObj} from '@storybook/react';
import {SelectColumn} from "dashboard/features/selectColumn";

const meta = {
    title: 'dashboard/features/selectColumn',
    component: SelectColumn,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof SelectColumn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TableColumn: Story = {
    args: {
        titleAbove: 'Столбец таблицы',
    },
};
