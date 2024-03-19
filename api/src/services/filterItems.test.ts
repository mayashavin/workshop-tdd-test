import { describe, expect, it } from "vitest";
import { filterItems } from "./filterItems";

describe("filterItems", () => {
  it("should filter items by name", () => {
    const mockItems = [
      {
        name: "foo",
      },
      {
        name: "bar",
      },
    ];
    expect(filterItems(mockItems, "name", "foo")).toEqual([
      {
        name: "foo",
      },
    ]);
  });

  it("should return all items if no name is provided", () => {
    const mockItems = [
      {
        name: "foo",
      },
      {
        name: "bar",
      },
    ];

    expect(filterItems(mockItems, "name")).toEqual(mockItems);
  });

  it("should return empty if filterBy is not a valid property", () => {
    const mockItems = [
      {
        name: "foo",
      },
      {
        name: "bar",
      },
    ];
    expect(filterItems(mockItems, "title", "foo")).not.toEqual(mockItems);
  });

  it("should return filtered items by case insensitive", () => {
    const mockItems = [
      {
        name: "FOO",
      },
      {
        name: "bar",
      },
    ];
    expect(filterItems(mockItems, "name", "foo")).toEqual([
      {
        name: "FOO",
      },
    ]);
  });

  it("should return filtered items if filterBy contains query", () => {
    const mockItems = [
      {
        name: "foo",
      },
      {
        name: "bar",
      },
    ];
    expect(filterItems(mockItems, "name", "f")).toEqual([
      {
        name: "foo",
      },
    ]);
  });
});
