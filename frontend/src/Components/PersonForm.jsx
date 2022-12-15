import React from 'react'

function PersonForm({ handleSubmit, newName, setNewName, newNumber, setNewNumber}) {
    
  return (
    <div>
        <form onSubmit={(handleSubmit)}>
            <div>
                name: <input
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    />
            </div>
            <div>
                number: <input
                value={newNumber}
                onChange={e => setNewNumber(e.target.value)}
                    />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>Add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm