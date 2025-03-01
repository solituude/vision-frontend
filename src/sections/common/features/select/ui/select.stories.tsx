import type {Meta, StoryObj} from '@storybook/react';
import {fn} from "@storybook/test";

import {Select} from "common/features/select";
import {SortType} from "dashboard/widgets/sortFolder/ui/sortSelectFolder";

const meta = {
    title: 'common/select',
    component: Select,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SelectSample: Story = {
    args: {
        name: 'string',
        onChange: fn(),
        type: 'radio',
        items: [SortType.asc, SortType.desc, SortType.alpha, SortType.nonAlpha],
        placeholder: "йцукенгшщз"
    },
};
