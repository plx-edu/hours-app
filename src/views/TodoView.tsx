import {useEffect, useState} from "react";
// import {TiDeleteOutline, TiPencil, TiDocumentAdd} from "react-icons/ti";

type todo = {
  id: number; 
  createdAt: Date;
  updatedAt: Date;
  task: string;
  isDone: boolean;
  categoryId: number;
};

export default function TodoView(props: {categoryId?: number}) {
	const [error, setError] = useState(false);
	const [items, setItems] = useState<todo[]>([
    {
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      task: "task 1",
      isDone: false,
      categoryId: 1,
    },
  ]);
	const [todoInput, setTodoInput] = useState("");

	useEffect(() => {
    let path = "";
    // switch (true) {
    //   case props.categoryId === 0:
    //     path = "http://localhost:3005/todo";
    //     break;
    //   case props.categoryId > 0:
    //     path = `http://localhost:3005/category/${props.categoryId}/todo`;
    //     break;
    //   default:
    //     console.log("Invalid categoryId");
    //     setItems([]);
    //     return;
    // }

		// fetch(`http://localhost:3005/todo/${props.categoryId ? props.categoryId : ""}`)
		// fetch(path)
		// 	.then((res) => res.json())
		// 	.then(
		// 		(result) => setItems(result),
		// 		(error) => {
		// 			setError(error);
		// 		},
		// 	);
	}, [props.categoryId]);

	function addTodo() {
		// const todoToAdd = todoInput.trim();
		if (props.categoryId <= 0 || !todoInput.trim()) {
			// console.log("Do NOT show todo input");
			return;
		}

		// console.log("todo to add:", newTodo);

	}

	// function addTodo() {
	// 	// const todoToAdd = todoInput.trim();
	// 	if (props.categoryId <= 0 || !todoInput.trim()) {
	// 		// console.log("Do NOT show todo input");
	// 		return;
	// 	}

	// 	const newTodo = {
	// 		task: todoInput.trim(),
	// 		categoryId: props.categoryId,
	// 	};

	// 	// console.log("todo to add:", newTodo);

	// 	fetch(`http://localhost:3005/todo`, {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify(newTodo), // body data type must match "Content-Type" header
	// 	})
	// 		.then((res) => res.json())
	// 		.then((result) => {
	// 			// If error obj
	// 			if (result.hasOwnProperty("code")) return;

	// 			let arr = items;
	// 			arr.push(result);
	// 			setItems(arr);
	// 			setTodoInput("");
	// 		});
	// }

	function updateTodo(idTobeUpdated: number) {
		// console.log("todo to be update:", idTobeUpdated);
		const currentTask = items.filter((x) => x.id === idTobeUpdated)[0].task;
		const newTask = window.prompt("Update", currentTask)?.trim();

		if (newTask !== undefined && newTask?.length > 0 && newTask !== currentTask) {
			console.log(newTask);

			const newTodo = {
				task: newTask,
			};
			fetch(`http://localhost:3005/todo/${idTobeUpdated}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newTodo), // body data type must match "Content-Type" header
			})
				.then((res) => res.json())
				.then((result) => {
					// If error obj
					if (result.hasOwnProperty("code")) return;

					const indexToUpdate = items.indexOf(items.filter((x) => x.id === idTobeUpdated)[0]);
					const arr = JSON.parse(JSON.stringify(items)); // https://www.freecodecamp.org/news/how-to-clone-an-array-in-javascript-1d3183468f6a/
					arr[indexToUpdate].task = result.task;
					// console.log("::", arr[indexToUpdate]);
					// console.log(":::", items[indexToUpdate]);

					setItems(arr);
				});
		} else {
			console.log("Nothing to update");
		}
	}

	function setTaskDone(idTobeUpdated: number, done: boolean) {
		console.log("Task id", idTobeUpdated, "is done", done);

		const newTodo = {
			isDone: !done,
		};

		fetch(`http://localhost:3005/todo/${idTobeUpdated}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newTodo), // body data type must match "Content-Type" header
		})
			.then((res) => res.json())
			.then((result) => {
				console.log(result);

				// If error obj
				if (result.hasOwnProperty("code")) return;

				const indexToUpdate = items.indexOf(items.filter((x) => x.id === idTobeUpdated)[0]);
				const arr = JSON.parse(JSON.stringify(items)); // https://www.freecodecamp.org/news/how-to-clone-an-array-in-javascript-1d3183468f6a/
				arr[indexToUpdate].isDone = result.isDone;
				// console.log("::", arr[indexToUpdate]);
				// console.log(":::", items[indexToUpdate]);

				setItems(arr);
			});
	}

	function deleteTodo(idTobeDelete: number) {
		// console.log("todo to be deleted:", idTobeDelete);
		if (window.confirm("Sure ?")) {
			fetch(`http://localhost:3005/todo/${idTobeDelete}`, {
				method: "DELETE",
			})
				.then((res) => res.json())
				.then((result) => {
					// Remove deleted item from items
					setItems(items.filter((x) => x.id !== result.id));
				});
		}
	}

	if (error) {
		return <div>Error: {JSON.stringify(error)}</div>;
	} else {
		return (
			<section className="todoContainer">
				<section className="taskSection">
					{items.map((item) => (
						<article className="todoItem" key={item.id} style={{display: "flex", gap: "10px"}}>
							<div className="todoTask">
								<p
									className={item.isDone ? "taskDone" : ""}
									onClick={() => {
										setTaskDone(item.id, item.isDone);
									}}
								>
									{item.task}
								</p>
							</div>

							<div className="todoBttnBox">
								<button className="todoBttn todoBttnDelete" type="button" onClick={() => deleteTodo(item.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                </svg>

								</button>
								<button className="todoBttn" type="button" onClick={() => updateTodo(item.id)}>
									
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                  <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                </svg>
								</button>
							</div>
						</article>
					))}
				</section>

				{props.categoryId > 0 && (
					<div className="todoInput">
						<input
							type="text"
							onChange={(e) => setTodoInput(e.target.value)}
							onKeyUp={(e) => {
								if (e.key === "Enter") {
									addTodo();
								} else if (e.key === "Escape") {
									setTodoInput("");
								}
							}}
							value={todoInput}
							placeholder="New Task"
							required
						/>
						<button type="button" onClick={addTodo}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zM10 8a.75.75 0 01.75.75v1.5h1.5a.75.75 0 010 1.5h-1.5v1.5a.75.75 0 01-1.5 0v-1.5h-1.5a.75.75 0 010-1.5h1.5v-1.5A.75.75 0 0110 8z" clipRule="evenodd" />
            </svg>
						</button>
						<button
							type="button"
							onClick={() => {
								setTodoInput("");
							}}
						>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
              </svg>

						</button>
					</div>
				)}
			</section>
		);
	}
}