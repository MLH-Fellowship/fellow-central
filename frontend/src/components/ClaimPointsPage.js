import React from 'react'
import '../sass/ClaimPointsPage.scss'
import PageHeader from './PageHeader'
import InfoCard from './InfoCard'
import Button from './Button'

const ClaimPointsPage = () => {
  const handleSubmit = (event) => {
    event.preventDefault();

    // Call API
  }

  return (
    <div className="ClaimPointsPage">
      <PageHeader title="Claim Points" />

      <div className="page-content-container">
        <InfoCard>
          <form onSubmit={handleSubmit}>
            <div className="form-fields">
              <div className="input-group">
                <label>Enter Code</label>
                <div className="ClaimPointsPage_code_container">
                  <input type="text" style={{ width: '270px' }} />
                  {/* <Button text="Generate" buttontype="secondary" style={{ marginLeft: '15px' }} /> */}
                </div>
              </div>
            </div>
            <Button text="Claim" type="submit" style={{ marginTop: '15px' }} />
          </form>
        </InfoCard>
        <InfoCard title="History">Content</InfoCard>
      </div>
    </div>
  )
}

export default ClaimPointsPage
