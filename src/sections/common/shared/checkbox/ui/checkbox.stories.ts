import {Checkbox} from "common/shared/checkbox";
import {fn} from "@storybook/test";
import {Meta, StoryObj} from "@storybook/react";


const meta = {
    title: 'common/checkbox',
    component: Checkbox,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    // args: {onClick: fn()},
}satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PrivetLabel: Story = {
    args: {
        checked: true,
        label: 'privet',
        onChecked: fn()
    }
}
