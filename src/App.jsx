import { CategoryScale, Chart } from 'chart.js/auto';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import LoadSVG from 'react-loadsvg';

Chart.register(CategoryScale);

function App() {

    const [formVal, setFormVal] = useState({
        message: "",
        date: "",
    });

    const [toDoList, setToDoList] = useState([]);

    function handleChange({ target }) {
        setFormVal(values => ({ ...values, [target.name]: target.value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        setToDoList(list => [formVal, ...list]);
        setFormVal({
            message: "",
            date: "",
        });
        console.log(this);
    }

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: "Messages added",
                data: [],
                borderColor: "black",
                backGroundColor: "#1596",
                borderWidth: 2,
            },
        ],
    });

    useEffect(() => {
        const newVals = {};
        for (let item of toDoList) {
            newVals[item.date] = (newVals[item.date] || 0) + 1;
        }

        const newData = {
            labels: Object.keys(newVals),
            datasets: [
                {
                    label: "Messages added",
                    data: Object.values(newVals),
                    borderColor: "black",
                    backGroundColor: "#1596",
                    borderWidth: 2,
                },
            ],
        };
        setChartData(newData);

    }, [toDoList]);

    return (
        <>
            <LoadSVG />
            <form onSubmit={handleSubmit}>
                <input type="text" name="message" placeholder="Message..." id="message" value={formVal.message} onChange={handleChange} required />
                <input type="date" name="date" id="date" value={formVal.date} onChange={handleChange} required />
                <button type="submit">Add</button>
            </form>
            <Bar data={chartData} options={{
                scales: {
                    y: {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Data Orgranized In Bars',
                    fontSize: 25
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            }} width={500} />
            <ul>
                {toDoList.map((item, index) => (<li key={index}>
                    [<small>{item.date}</small>]&nbsp;&nbsp;&nbsp;<strong>{item.message}</strong>
                </li>))}
            </ul>
        </>
    )
}

export default App
