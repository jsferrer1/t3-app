import type { Meta, StoryObj } from "@storybook/nextjs";

import HomePageHeroSection from "~/components/HomePageHero";

const meta = {
  title: "Components/HomePageHero",
  component: HomePageHeroSection,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof HomePageHeroSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const CustomContent: Story = {
  args: {
    title: "Ship faster",
    description: "Every piece of copy and the call to action is configurable.",
    ctaLabel: "Read the docs",
    ctaHref: "/docs",
  },
};
