import React, { useState } from 'react'
import '../sass/ManageEventsPage.scss'
import PageHeader from './PageHeader'
import InfoCard from './InfoCard'
import Button from './Button'

const ManageEventsPage = () => {
  const [name, setName] = useState('');
  const [starts, setStarts] = useState('');
  const [ends, setEnds] = useState('');
  const [link, setLink] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [points, setPoints] = useState('');

  const handleSubmit = (event) => {
    alert(`
      Name: ${ends}
    `)
    event.preventDefault();

    // Call API
    setName('')
    setStarts('')
    setEnds('')
    setLink('')
    setSecretCode('')
    setPoints('')
  }

  return (
    <div className="ManageEventsPage">
      <PageHeader title="Manage Events" />

      <div className="page-content-container">
        <InfoCard title="Add Event">
          <form onSubmit={handleSubmit}>
            <div className="form-fields-row">
              <div className="input-group">
                <label>Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} style={{ width: '270px' }} required />
              </div>
              <div className="input-group">
                <label>Starts</label>
                <input type="datetime-local" value={starts} onChange={e => setStarts(e.target.value)} style={{ width: '270px' }} required />
              </div>
              <div className="input-group">
                <label>Ends</label>
                <input type="datetime-local" value={ends} onChange={e => setEnds(e.target.value)} style={{ width: '270px' }} required />
              </div>
              <div className="input-group">
                <label>Link</label>
                <input type="text" value={link} onChange={e => setLink(e.target.value)} style={{ width: '270px' }} required />
              </div>
              <div className="input-group">
                <label>Secret Code</label>
                <input type="text" value={secretCode} onChange={e => setSecretCode(e.target.value)} style={{ width: '270px' }} required />
              </div>
              <div className="input-group">
                <label>Points</label>
                <input type="number" min="0" value={points} onChange={e => setPoints(e.target.value)} style={{ width: '270px' }} required />
              </div>
            </div>
            <Button text="Add" type="submit" style={{ marginTop: '25px' }} />
          </form>
        </InfoCard>
        <InfoCard title="Events">
          Content
        </InfoCard>
      </div>
    </div>
  )
}

export default ManageEventsPage
