import React, { useEffect, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [list, setList] = useState([]);
	const [tarea, setTarea] = useState('');
	useEffect(() => {
		fetch("https://playground.4geeks.com/todo/users/alonso")
			.then(resp => resp.json())
			.then(data => {
				console.log("Tareas obtenidas:", data.todos);
				setList(data.todos);
			});

	}, [])

	const nuevaTarea = (e) => {
		if (e.key === "Enter" && tarea.trim() !== "") {
			const nueva = { label: tarea, is_done: false };

			fetch(`https://playground.4geeks.com/todo/todos/alonso`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(nueva)
			})
				.then(resp => resp.json())
				.then(data => setList([...list, data]))
				.finally(() => setTarea(""));
		}
	}

	function eliminar(id) {
		fetch(`https://playground.4geeks.com/todo/todos/${id}`, { 
			method: "DELETE" })
		.then(response =>{
			if(response.ok)setList(list.filter((item) => item.id !== id))
			});
	}

	return (
		<div className="container w-50 p-3">
			<h1 className="text-center">Todos</h1>
			<ul className="list-group">
				<li className="list-group-item px-5">
					<input
						className="border-0 my-1 fs-3 text-secondary"
						type="text"
						value={tarea}
						onChange={(e) => setTarea(e.target.value)}
						onKeyDown={nuevaTarea}
						placeholder="What need to be done?" />
				</li>


				{list.map((item) => (
					<li className="list-group-item d-flex justify-content-between list-group-item-action px-5" key={item.id}>
						<p className="fs-3 text-secondary my-auto">{item.label}</p>
						<button type="button" className="btn-close my-auto" aria-label="Close" onClick={() => eliminar(item.id)}></button>
					</li>
				))}

				<li className="list-group-item">
					<small className="text-body-secondary">{list.length} item left</small>

				</li>
			</ul>
		</div >
	);
};

export default Home;