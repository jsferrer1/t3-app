import { describe, expect, it, vi } from "vitest";

vi.mock("~/server/db", () => ({ db: {} }));

import { MAX_POST_NAME_LENGTH, postRouter } from "~/server/api/routers/post";

const session = {
  user: { id: "user-1", name: "Test" },
  expires: new Date(Date.now() + 60_000).toISOString(),
};

function setup(authed = true) {
  const create = vi.fn((args: unknown) => Promise.resolve({ id: 1, args }));
  const caller = postRouter.createCaller({
    session: authed ? session : null,
    db: { post: { create } },
  } as never);
  return { caller, create };
}

describe("postRouter.hello", () => {
  it("greets without authentication", async () => {
    const { caller } = setup(false);
    await expect(caller.hello({ text: "world" })).resolves.toEqual({
      greeting: "Hello world",
    });
  });
});

describe("postRouter.create", () => {
  it("rejects unauthenticated callers", async () => {
    const { caller, create } = setup(false);
    await expect(caller.create({ name: "x" })).rejects.toMatchObject({
      code: "UNAUTHORIZED",
    });
    expect(create).not.toHaveBeenCalled();
  });

  it("rejects empty and whitespace-only names", async () => {
    const { caller, create } = setup();
    await expect(caller.create({ name: "" })).rejects.toThrow();
    await expect(caller.create({ name: "   " })).rejects.toThrow();
    expect(create).not.toHaveBeenCalled();
  });

  it("rejects names longer than the limit", async () => {
    const { caller, create } = setup();
    await expect(
      caller.create({ name: "a".repeat(MAX_POST_NAME_LENGTH + 1) }),
    ).rejects.toThrow();
    expect(create).not.toHaveBeenCalled();
  });

  it("trims the name and links the post to the user, without delay", async () => {
    const { caller, create } = setup();
    const start = Date.now();
    await caller.create({ name: "  hello  " });
    expect(Date.now() - start).toBeLessThan(500);
    expect(create).toHaveBeenCalledWith({
      data: { name: "hello", createdBy: { connect: { id: "user-1" } } },
    });
  });

  it("accepts a name at the limit", async () => {
    const { caller } = setup();
    await expect(
      caller.create({ name: "a".repeat(MAX_POST_NAME_LENGTH) }),
    ).resolves.toBeDefined();
  });
});
