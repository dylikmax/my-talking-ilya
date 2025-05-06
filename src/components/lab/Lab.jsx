import "./Lab.css"

export default function Lab({isDone, number, handle}) {
  return <div className={`lab ${isDone ? 'done' : 'undone'}`} onClick={handle}>
    {number}
  </div>
}