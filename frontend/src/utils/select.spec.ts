import { getTasksByCreatedAt } from "./select";

const mockProject = {
  id: "1",
  name: "Revamp Testing Suite",
  description: "",
  isFavorite: false,
  isDone: false,
  createdAt: "2024-08-25T16:54:05.991Z",
  updatedAt: "2024-08-25T16:54:05.991Z",
};

describe("select", () => {
  it("getTasksByCreatedAt", () => {
    const tasks = getTasksByCreatedAt([
      {
        id: "B7P7",
        name: "add task details route 1",
        status: "Todo",
        priority: "High",
        label: "Feature",
        createdAt: "2024-08-14T22:48:22.325Z",
        updatedAt: "2024-08-16T00:08:41.679Z",
        project: mockProject,
      },
      {
        id: "RTQK",
        name: "hiii",
        status: "Done",
        priority: "Medium",
        label: "Feature",
        createdAt: "2024-08-17T16:16:59.478Z",
        updatedAt: "2024-08-17T16:28:35.953Z",
        project: mockProject,
      },
      {
        id: "GEPR",
        name: "test",
        status: "Todo",
        priority: "Medium",
        label: "Feature",
        createdAt: "2024-08-17T16:28:28.644Z",
        updatedAt: "2024-08-17T16:28:28.644Z",
        project: mockProject,
      },
      {
        id: "JQAK",
        name: "another",
        status: "Todo",
        priority: "Medium",
        label: "Feature",
        createdAt: "2024-08-17T16:52:40.687Z",
        updatedAt: "2024-08-17T16:52:40.687Z",
        project: mockProject,
      },
      {
        id: "4LP9",
        name: "let's",
        status: "Todo",
        priority: "Medium",
        label: "Feature",
        createdAt: "2024-08-17T16:52:42.923Z",
        updatedAt: "2024-08-17T16:52:42.923Z",
        project: mockProject,
      },
    ]);

    expect(tasks).toStrictEqual([
      expect.objectContaining({ createdAt: "2024-08-14T22:48:22.325Z" }),
      expect.objectContaining({ createdAt: "2024-08-17T16:16:59.478Z" }),
      expect.objectContaining({ createdAt: "2024-08-17T16:28:28.644Z" }),
      expect.objectContaining({ createdAt: "2024-08-17T16:52:40.687Z" }),
      expect.objectContaining({ createdAt: "2024-08-17T16:52:42.923Z" }),
    ]);
  });
});
