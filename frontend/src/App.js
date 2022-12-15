import { useEffect, useState } from 'react'
import personService from './Services/personService'
import PersonForm from './Components/PersonForm'
import Notification from './Components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleFilterChange = (e) => {
    setFilterName(e.target.value)
  }

  const filtered = !filterName
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(filterName.toLowerCase()))
        
  const handleSubmit = (e) => {
    e.preventDefault()

    const phonebookObject = {
      name: newName,
      number: newNumber
    }

    const record = persons.find(person => person.name === newName)

      if(record) {
        const confirmBox = window.confirm(`${newName} already exists. Do you want to update person's number?`)
        if (confirmBox === true) {
          personService
            .update(record.id, phonebookObject)
            .then(returnedPerson => {
              setPersons(persons.map(p => p.id !== record.id ? p : returnedPerson))
            })
        }
      } else {
        personService
        .create(phonebookObject)
        .then(returnedPerson => {
          setPersons(persons.concat(phonebookObject))
          setSuccessMessage(`${phonebookObject.name} added to phonebook.` )
          setTimeout(() => setSuccessMessage(null), 5000)
          setNewName("")
          setNewNumber("")
        }).catch(error => {
          console.log(error.response.data.error)
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      }
  }

  const deletePersonNNumber = (id) => {
    personService
      .deletePerson(id)
      .then(setPersons(persons.filter((person) => person.id !== id)))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Notification message={successMessage} />
      <form>
      <div>
          filter by name: <input
            value={filterName}
            onChange={handleFilterChange}
            />
        </div>
      </form>
        <PersonForm 
          handleSubmit={handleSubmit} 
          newName={newName}
          setNewName={setNewName} 
          newNumber={newNumber} 
          setNewNumber={setNewNumber}
        />
      <h2>Numbers:</h2>
      <ul>
        {filtered.map((person) => {
          return (
            <li key={person.id}>
              {person.name} - {person.number} <button onClick={() => {
                const confirmBox = window.confirm(
                  "Do you want to delete this contact person?"
                )
                if (confirmBox === true) {
                  deletePersonNNumber(person.id)
                }
              }}>delete</button>
            </li>
          )
        })}
        </ul>
    </div>
  )
}

export default App