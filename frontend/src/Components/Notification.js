function Notification({ message }) {

    if (message === null) {
        return null
    }

  return (
    <div className="succcess-notification">
        {message}
    </div>
  )
}

export default Notification