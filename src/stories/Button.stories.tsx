import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const meta = {
  title: "Example/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    children: "Button",
    variant: "primary",
    size: "medium",
    disabled: false,
    loading: false,
    name: "button",
    "aria-label": "",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    disabled: {
      control: "boolean",
    },
    loading: {
      control: "boolean",
    },
    children: {
      control: "text",
    },
    name: {
      control: "text",
    },
    "aria-label": {
      control: "text",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  args: {
    children: "Button",
  },
};

export const Variants: Story = {
  name: "Variants & States",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <Button variant="primary" name="primary">
          Primary
        </Button>
        <Button variant="secondary" name="secondary">
          Secondary
        </Button>
        <Button variant="tertiary" name="tertiary">
          Tertiary
        </Button>
      </div>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <Button variant="primary" name="primary-loading" loading>
          Primary
        </Button>
        <Button variant="secondary" name="secondary-loading" loading>
          Secondary
        </Button>
        <Button variant="tertiary" name="tertiary-loading" loading>
          Tertiary
        </Button>
      </div>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <Button variant="primary" name="primary-disabled" disabled>
          Primary
        </Button>
        <Button variant="secondary" name="secondary-disabled" disabled>
          Secondary
        </Button>
        <Button variant="tertiary" name="tertiary-disabled" disabled>
          Tertiary
        </Button>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Button variant="primary" size="small" name="primary-small">
        Small
      </Button>
      <Button variant="primary" size="medium" name="primary-medium">
        Medium
      </Button>
      <Button variant="primary" size="large" name="primary-large">
        Large
      </Button>
    </div>
  ),
};
