import {
  GoAButton,
  GoAInput,
  GoARadioGroup,
  GoARadioItem,
} from "@abgov/react-components";
import { useState } from "react";

interface Task {
  id: string;
  desc: string;
  status: string;
}

function createTask(desc: string): Task {
  return {
    id: `${Date.now()}`,
    desc,
    status: "incomplete",
  };
}

export const TestsRoute = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [details, setDetails] = useState<string>("");

  function addTask(desc: string) {
    const task = createTask(desc);

    setTasks((old) => [...old, task]);
    setDetails("");
  }

  const TaskState = ({ tasks }: { tasks: Task[] }) => {
    const completeCount = tasks.filter((t) => t.status === "done").length;
    const incompleteCount = tasks.length - completeCount;
    return (
      <div>
        <em style={{ fontSize: "1rem", textDecoration: "none" }}>
          Incomplete: {incompleteCount} Completed: {completeCount}
        </em>
      </div>
    );
  };

  function updateValue(task: Task, newStatus: string) {
    setTasks((old) => {
      const updated = old.find((t) => t.id === task.id);
      if (updated) {
        updated.status = newStatus;
      }
      return [...old];
    });
  }

  return (
    <>
      <h1>Todos</h1>
      <div style={{ display: "flex", gap: "1rem" }}>
        <GoAInput
          name="details"
          type="text"
          value={details}
          onChange={(_name, value) => setDetails(value)}
        />
        <GoAButton onClick={() => addTask(details)}>New Task</GoAButton>
      </div>

      <hr />

      <TaskState tasks={tasks} />

      {tasks.map((task: Task) => (
        <div
          key={task.id}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>{task.desc}</div>
          <GoARadioGroup
            orientation="horizontal"
            name={task.id}
            value={task.status}
            onChange={(_: string, value: string) => updateValue(task, value)}
          >
            <GoARadioItem name={task.id} label="Done" value="done" />
            <GoARadioItem
              name={task.id}
              label="Incomplete"
              value="incomplete"
            />
          </GoARadioGroup>
        </div>
      ))}
    </>
  );
};
