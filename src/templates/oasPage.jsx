import React from "react"

export default props => {
  console.log(props)
  return (
    <div>
      {props.pageContext.servers.map(server => (
        <div key={server.url}>{server.url}</div>
      ))}
    </div>
  )
}
