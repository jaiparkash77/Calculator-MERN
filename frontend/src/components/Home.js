import React, { useEffect, useState } from "react";
import "./style.css";
import axios from 'axios';

const Home = () => {
  const [firstValue, setFirstValue] = useState("");
  const [secondValue, setSecondValue] = useState("");
  const [operator, setOperator] = useState("");
  const [checkOperator, setCheckOperator] = useState(false);
  const [result, setResult] = useState(0);
  const [name,setName] = useState("");
  const [loading, setLoading] = useState(false);
  // Fetch
  const [data,setData] = useState([]);
  useEffect(()=>{
    setLoading(true);
    const fetchData=async()=>{
      await axios.get('http://localhost:4000/api/v1/calculates').then((res)=>setData(res.data.calculates));
    }
    fetchData();
    setLoading(false);
  },[]);

  const handleClick = (e) => {
    if (e === "+" || e === "-" || e === "/" || e === "%" || e === "*") {
      if (!checkOperator) {
        setCheckOperator(true);
        setOperator(e);
        setResult((pre) => pre + e);
      }
      return;
    }
    if (checkOperator) {
      setSecondValue(secondValue + e);
      setResult((pre) => pre + e);
    } else {
      setFirstValue(firstValue + e);
      setResult(firstValue + e);
    }
  };
  const handleSubmit = () => {
    if (operator === "+") {
      setResult(Number(firstValue) + Number(secondValue));
    } else if (operator === "-") {
      setResult(Number(firstValue) - Number(secondValue));
    } else if (operator === "*") {
      setResult(Number(firstValue) * Number(secondValue));
    } else if (operator === "/") {
      setResult(Number(firstValue) / Number(secondValue));
    } else if (operator === "%") {
      setResult((Number(firstValue) / 100) * Number(secondValue));
    }
  };
  const handleClear = () => {
    setResult(0);
  };

  const handleSave=async (e)=>{
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    // console.log({
    //     name: data.get('name'),
    // });
    const name = data.get('name');
    let cal = firstValue + operator + secondValue;
    
    await axios.post('http://localhost:4000/api/v1/calculate/new',{name, calculation: cal, result:result}).then(()=>{
      alert("Success");
      setFirstValue("");
      setSecondValue("");
      setOperator("");
      setResult(0);
    })
  }
  const handleDelete = async(reqId)=>{
    await axios.delete(`http://localhost:4000/api/v1/calculates/${reqId}`).then(()=>{
      alert("Delete Success");
    })
  }
  console.log("rendering test")
  return (
    <div className="home">
      <div className="leftSide">
        <h1>Calculator</h1>
        <div className="calculator">
          <div className="display">{result}</div>
          <div className="row">
            <button onClick={handleClear}>AC</button>
            <button>+/-</button>
            <button onClick={() => handleClick("%")}>%</button>
            <button onClick={() => handleClick("/")}>/</button>
          </div>
          <div className="row">
            <button onClick={() => handleClick(7)}>7</button>
            <button onClick={() => handleClick(8)}>8</button>
            <button onClick={() => handleClick(9)}>9</button>
            <button onClick={() => handleClick("*")}>×</button>
          </div>
          <div className="row">
            <button onClick={() => handleClick(4)}>4</button>
            <button onClick={() => handleClick(5)}>5</button>
            <button onClick={() => handleClick(6)}>6</button>
            <button onClick={() => handleClick("-")}>-</button>
          </div>
          <div className="row">
            <button onClick={() => handleClick(1)}>1</button>
            <button onClick={() => handleClick(2)}>2</button>
            <button onClick={() => handleClick(3)}>3</button>
            <button onClick={() => handleClick("+")}>+</button>
          </div>
          <div className="row">
            <button onClick={() => handleClick(0)} className="zero">0</button>
            <button onClick={() => handleClick(".")}>.</button>
            <button onClick={handleSubmit}>=</button>
          </div>
        </div>
        <div>
          <h2>Calculation Name</h2>
          <form onSubmit={handleSave}>
          <input type="text" name="name" required className="textBox" onChange={(e)=>setName(e.target.value)} placeholder="Enter your name" />
          <button className="save" type="submit">Save</button>
          </form>
        </div>
      </div>
      <div  className="rightSide">
        <h1>Your Calculations</h1>
        <table>
          <tr>
            <td>Name</td>
            <td>Calculation</td>
            <td>Result</td>
            <td>Delete</td>
          </tr>
        { loading ? ("Loading...") : (data.map((res)=>(
          <tr>
            <td>{res.name}</td>
            <td>{res.calculation}</td>
            <td>{res.result}</td>
            <td onClick={()=>handleDelete(res._id)}>Del</td>
          </tr>
        )))}
        </table>
      </div>
    </div>
  );
};

export default Home;
