import "./Ilya.css"

export default function Ilya({happiness}) {
  return <div className="ilya">
    <img src="png/gornak.png" className="ilya-img"/>
    <img src="png/mouth.png" className={`mouth ${happiness >= 40 ? 'smiled' : 'sad'}`}/>
  </div>
}