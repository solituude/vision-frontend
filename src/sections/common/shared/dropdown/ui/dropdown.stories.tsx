import type {Meta, StoryObj} from '@storybook/react';
import {fn} from "@storybook/test";
import {Dropdown} from "common/shared/dropdown";

const meta = {
    title: 'common/dropdown',
    component: Dropdown,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DropdownSample: Story = {
    args: {
        titleAbove: 'lalala',
        label: 'Столбец таблицы',
        showDropdown: false,
        handleCloseDropdown: fn(),
        handleOpenDropdown: fn(),
        children: <div>test</div>
    },
};
