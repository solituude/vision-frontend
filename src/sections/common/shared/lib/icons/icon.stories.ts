import type {Meta, StoryObj} from '@storybook/react';

import {Icon} from './Icon';

const meta = {
    title: 'common/icon',
    component: Icon,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Add16: Story = {
    args: {
        name: 'add_16',
        color: '--icon-primary',
        width: 20,
        height: 20,
    },
};

export const Add_circle_outline_20: Story = {
    args: {
        name: 'add_circle_outline_20',
        color: '--icon-primary',
        width: 20,
        height: 20,
    },
};
// export const Secondary: Story = {
//     args: {
//         label: 'Button',
//     },
// };
//
// export const Large: Story = {
//     args: {
//         size: 'large',
//         label: 'Button',
//     },
// };
//
// export const Small: Story = {
//     args: {
//         size: 'small',
//         label: 'Button',
//     },
// };
