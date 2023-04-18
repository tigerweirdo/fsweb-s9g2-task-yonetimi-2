import React from "react";
import { formatDistanceToNow, isWithinInterval, sub } from "date-fns";
import { tr } from "date-fns/locale";

function Task({ taskObj, onComplete }) {
  const deadline = new Date(taskObj.deadline);

  const deadlineText = formatDistanceToNow(deadline, {
    addSuffix: true,
    locale: tr,
  });

  const isDeadlineClose = () => {
    const currentDate = new Date();
    return isWithinInterval(currentDate, {
      start: sub(deadline, { days: 3 }),
      end: deadline,
    });
  };

  const taskBgColor = isDeadlineClose() ? "#ffd9d4" : "";

  return (
    <div
      className="task p-4 border rounded mb-4"
      style={{ backgroundColor: taskBgColor }}
    >
      <h3 className="text-xl font-semibold mb-2">{taskObj.title}</h3>
      <div className="deadline mb-2">
        Son teslim: <span>{deadlineText}</span>
      </div>
      <p className="mb-4">{taskObj.description}</p>
      <div className="mb-4">
        {taskObj.people.map((p) => (
          <span className="pill px-2 py-1 bg-gray-200 rounded text-sm mr-2" key={p}>
            {p}
          </span>
        ))}
      </div>
      {onComplete && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => onComplete(taskObj.id)}
        >
          Tamamlandı
        </button>
      )}
    </div>
  );
}

export default Task;
